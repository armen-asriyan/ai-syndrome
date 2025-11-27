import type Konva from "konva";
import React from "react";
import { Image } from "react-konva";

interface GifImageProps {
  src: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  opacity?: number;
  draggable?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface GifFrame {
  buffer: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GiflerAnimation {
  stop: () => void;
}

interface GiflerInstance {
  frames: (
    canvas: HTMLCanvasElement,
    cb: (ctx: CanvasRenderingContext2D, frame: GifFrame) => void
  ) => GiflerAnimation;
}

declare global {
  interface Window {
    gifler?: (url: string) => GiflerInstance;
  }
}

const GifKonvaImage: React.FC<GifImageProps> = ({
  src,
  x = 0,
  y = 0,
  width,
  height,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
  opacity = 1,
  draggable = false,
  onLoad,
  onError,
}) => {
  const imageRef = React.useRef<Konva.Image | null>(null);
  const [canvas] = React.useState(() => document.createElement("canvas"));
  const animationRef = React.useRef<GiflerAnimation | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const start = () => {
      if (!window.gifler) {
        onError?.(new Error("Gifler library not loaded"));
        return;
      }

      // Stop previous animation
      animationRef.current?.stop();

      // const ctx = canvas.getContext("2d");

      animationRef.current = window.gifler(src).frames(canvas, (ctx, frame) => {
        if (!isMounted) return;

        // Resize once
        if (canvas.width !== frame.buffer.width) {
          canvas.width = frame.buffer.width;
          canvas.height = frame.buffer.height;
        }

        // Draw frame
        ctx.drawImage(frame.buffer, frame.x, frame.y);

        // Update Konva layer
        imageRef.current?.getLayer()?.batchDraw();
      });

      onLoad?.();
    };

    // Load script only once globally
    if (!window.gifler) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/gifler@0.1.0/gifler.min.js";

      script.onload = start;
      script.onerror = () =>
        onError?.(new Error("Failed to load gifler library"));

      document.head.appendChild(script);
    } else {
      start();
    }

    return () => {
      isMounted = false;
      animationRef.current?.stop();
    };
  }, [src, onLoad, onError, canvas]);

  return (
    <Image
      ref={imageRef}
      image={canvas}
      x={x}
      y={y}
      width={width}
      height={height}
      scaleX={scaleX}
      scaleY={scaleY}
      rotation={rotation}
      opacity={opacity}
      draggable={draggable}
    />
  );
};

export default GifKonvaImage;
