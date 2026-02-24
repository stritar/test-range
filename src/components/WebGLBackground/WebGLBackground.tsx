import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { useTheme } from "../../theme/ThemeContext";
import styles from "./WebGLBackground.module.css";

const DITHER_OPACITY = 0.2;

const BAYER_8X8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

function createBayerDataURL(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 8;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(8, 8);
  for (let i = 0; i < 64; i++) {
    const v = Math.round((BAYER_8X8[i] / 63) * 255);
    const off = i * 4;
    img.data[off] = v;
    img.data[off + 1] = v;
    img.data[off + 2] = v;
    img.data[off + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

function createBayerTexture(): THREE.DataTexture {
  const data = new Uint8Array(BAYER_8X8.map((v) => Math.round((v / 63) * 255)));
  const tex = new THREE.DataTexture(data, 8, 8, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

const DitherShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    tBayer: { value: null as THREE.DataTexture | null },
    uOpacity: { value: DITHER_OPACITY },
    uResolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tBayer;
    uniform float uOpacity;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);

      vec2 ditherCoord = gl_FragCoord.xy / 8.0;
      float threshold = texture2D(tBayer, ditherCoord).r;

      float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float dithered = step(threshold, luma);

      gl_FragColor = vec4(mix(color.rgb, vec3(dithered), uOpacity), color.a);
    }
  `,
};

const MAX_YAW = 0.8;
const MAX_PITCH = 0.45;
const MAX_SHIFT_X = 0.25;
const MAX_SHIFT_Y = 0.15;
const LERP_SPEED = 0.05;
const FIT_PADDING = 1.2;

export function WebGLBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);

    // --- Post-processing ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bayerTex = createBayerTexture();
    const ditherPass = new ShaderPass(DitherShader);
    ditherPass.uniforms.tBayer.value = bayerTex;
    composer.addPass(ditherPass);
    composer.addPass(new OutputPass());

    // --- PMREM ---
    const pmrem = new THREE.PMREMGenerator(renderer);

    // --- State ---
    let envLight: THREE.Texture | null = null;
    let envDark: THREE.Texture | null = null;
    let modelLight: THREE.Group | null = null;
    let modelDark: THREE.Group | null = null;
    let bothLoaded = false;
    let running = true;
    let rafId = 0;
    let driftTimer: ReturnType<typeof setInterval> | null = null;

    let targetYaw = 0,
      currYaw = 0;
    let targetPitch = 0,
      currPitch = 0;
    let targetShiftX = 0,
      currShiftX = 0;
    let targetShiftY = 0,
      currShiftY = 0;


    // --- Helpers ---
    function loadEnv(url: string): Promise<THREE.Texture> {
      const rgbe = new RGBELoader();
      return new Promise((resolve, reject) => {
        rgbe.load(
          url,
          (tex) => {
            const env = pmrem.fromEquirectangular(tex).texture;
            tex.dispose();
            resolve(env);
          },
          undefined,
          reject
        );
      });
    }

    function loadModel(url: string): Promise<THREE.Group> {
      const loader = new GLTFLoader();
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            const m = gltf.scene;
            m.traverse((o) => {
              if ((o as THREE.Mesh).isMesh) {
                const mesh = o as THREE.Mesh;
                mesh.frustumCulled = false;
                mesh.castShadow = false;
                mesh.receiveShadow = false;
                const mat = mesh.material as THREE.MeshStandardMaterial;
                if (mat?.isMeshStandardMaterial) mat.needsUpdate = true;
              }
            });
            resolve(m);
          },
          undefined,
          reject
        );
      });
    }

    function fitCameraToBoth(
      cam: THREE.PerspectiveCamera,
      a: THREE.Group | null,
      b: THREE.Group | null,
      padding: number
    ) {
      const box = new THREE.Box3();
      if (a) box.expandByObject(a);
      if (b) box.expandByObject(b);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      if (a) a.position.sub(center);
      if (b) b.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (cam.fov * Math.PI) / 180;
      let dist = maxDim / 2 / Math.tan(fov / 2);
      dist *= padding;
      cam.position.set(0, size.y * 0.15, dist);
      cam.lookAt(0, 0, 0);
      cam.near = Math.max(0.01, dist / 100);
      cam.far = dist * 100;
      cam.updateProjectionMatrix();
    }

    // --- Resize ---
    function resize() {
      const rect = container!.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, true);
      composer.setSize(w, h);
      ditherPass.uniforms.uResolution.value.set(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (bothLoaded) fitCameraToBoth(camera, modelLight, modelDark, FIT_PADDING);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("orientationchange", resize, { passive: true });

    // --- Theme application ---
    function applyTheme() {
      const t = themeRef.current;
      if (modelLight) modelLight.visible = t === "light";
      if (modelDark) modelDark.visible = t === "dark";
      if (t === "light" && envLight) scene.environment = envLight;
      if (t === "dark" && envDark) scene.environment = envDark;
    }

    const themeObserver = new MutationObserver((muts) => {
      if (muts.some((m) => m.attributeName === "data-theme")) applyTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // --- Pointer interaction ---
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const likelyPhone = (() => {
      const touch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const narrow = Math.min(window.innerWidth, window.innerHeight) < 768;
      return touch && narrow;
    })();

    function updateFromPointer(clientX: number, clientY: number) {
      const nx = (clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      const ny = (clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      targetYaw = nx * MAX_YAW;
      targetPitch = ny * MAX_PITCH;
      targetShiftX = -nx * MAX_SHIFT_X;
      targetShiftY = ny * MAX_SHIFT_Y;
    }

    function onPointerMove(e: PointerEvent) {
      updateFromPointer(e.clientX, e.clientY);
    }
    function onMouseLeave() {
      targetYaw = targetPitch = 0;
      targetShiftX = targetShiftY = 0;
    }

    if (!likelyPhone) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    // --- Phone drift ---
    function randomizeTargets() {
      targetYaw = (Math.random() * 2 - 1) * MAX_YAW;
      targetPitch = (Math.random() * 2 - 1) * MAX_PITCH;
      targetShiftX = (Math.random() * 2 - 1) * MAX_SHIFT_X;
      targetShiftY = (Math.random() * 2 - 1) * MAX_SHIFT_Y;
    }

    function startDrift() {
      if (prefersReduced) return;
      randomizeTargets();
      driftTimer = setInterval(randomizeTargets, 3500 + Math.random() * 2000);
    }

    function stopDrift() {
      if (driftTimer) {
        clearInterval(driftTimer);
        driftTimer = null;
      }
      targetYaw = targetPitch = 0;
      targetShiftX = targetShiftY = 0;
    }

    if (likelyPhone) startDrift();

    // --- Visibility ---
    function onVisibilityChange() {
      running = !document.hidden;
      if (!running) {
        stopDrift();
      } else {
        if (likelyPhone) startDrift();
        animate();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // --- Transforms ---
    function applyTransforms(obj: THREE.Group) {
      obj.rotation.set(currPitch, currYaw, 0);
      obj.position.x = currShiftX;
      obj.position.y = currShiftY;
    }

    // --- Animation loop ---
    function animate() {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      currYaw += (targetYaw - currYaw) * LERP_SPEED;
      currPitch += (targetPitch - currPitch) * LERP_SPEED;
      currShiftX += (targetShiftX - currShiftX) * LERP_SPEED;
      currShiftY += (targetShiftY - currShiftY) * LERP_SPEED;

      if (modelLight) applyTransforms(modelLight);
      if (modelDark) applyTransforms(modelDark);

      composer.render();
    }

    // --- Load assets ---
    const base = import.meta.env.BASE_URL;
    Promise.all([
      loadEnv(`${base}assets/hdr/light.hdr`),
      loadEnv(`${base}assets/hdr/dark.hdr`),
      loadModel(`${base}assets/model-light.glb`),
      loadModel(`${base}assets/model-dark.glb`),
    ])
      .then(([envL, envD, mLight, mDark]) => {
        envLight = envL;
        envDark = envD;
        modelLight = mLight;
        scene.add(modelLight);
        modelDark = mDark;
        scene.add(modelDark);
        bothLoaded = true;
        applyTheme();
        resize();
      })
      .catch((err) => console.error("Asset load failed:", err));

    animate();

    // --- Cleanup ---
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      stopDrift();
      themeObserver.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          const mat = mesh.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else if (mat) mat.dispose();
        }
      });

      envLight?.dispose();
      envDark?.dispose();
      bayerTex.dispose();
      composer.renderTarget1.dispose();
      composer.renderTarget2.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bayerBg = useMemo(() => createBayerDataURL(), []);

  return (
    <>
      <div
        className={styles.ditherOverlay}
        style={{ backgroundImage: `url(${bayerBg})` }}
        aria-hidden
      />
      <div ref={containerRef} className={styles.container} aria-hidden />
    </>
  );
}
