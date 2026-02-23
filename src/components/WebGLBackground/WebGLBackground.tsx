import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { useTheme } from "../../theme/ThemeContext";
import styles from "./WebGLBackground.module.css";

const MAX_YAW = 0.8;
const MAX_PITCH = 0.45;
const MAX_SHIFT_X = 0.25;
const MAX_SHIFT_Y = 0.15;
const EASE = 0.02;
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
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, true);
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

      currYaw += (targetYaw - currYaw) * EASE;
      currPitch += (targetPitch - currPitch) * EASE;
      currShiftX += (targetShiftX - currShiftX) * EASE;
      currShiftY += (targetShiftY - currShiftY) * EASE;

      if (modelLight) applyTransforms(modelLight);
      if (modelDark) applyTransforms(modelDark);

      renderer.render(scene, camera);
    }

    // --- Load assets ---
    Promise.all([
      loadEnv("/assets/hdr/light.hdr"),
      loadEnv("/assets/hdr/dark.hdr"),
      loadModel("/assets/model-light.glb"),
      loadModel("/assets/model-dark.glb"),
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
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={styles.container} aria-hidden />;
}
