import { useCallback, useRef, useState, type ReactNode } from "react";
import styles from "./ResizableBox.module.css";

interface ResizableBoxProps {
  children: ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export function ResizableBox({
  children,
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 120,
  minHeight = 80,
}: ResizableBoxProps) {
  const [size, setSize] = useState({ w: initialWidth, h: initialHeight });
  const dragRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.w,
        startH: size.h,
      };
    },
    [size],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setSize({
      w: Math.max(minWidth, dragRef.current.startW + dx),
      h: Math.max(minHeight, dragRef.current.startH + dy),
    });
  }, [minWidth, minHeight]);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.box}
        style={{ width: size.w, height: size.h }}
      >
        <div className={styles.content}>{children}</div>
        <div
          className={styles.handle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>
      <span className={styles.dimensions}>
        {Math.round(size.w)} &times; {Math.round(size.h)}
      </span>
    </div>
  );
}
