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
  width: number;
  height: number;
  x: number;
  y: number;
  buffer: HTMLCanvasElement;
  disposal?: number;
}

interface GiflerInstance {
  frames: (
    canvas: HTMLCanvasElement,
    callback: (ctx: CanvasRenderingContext2D, frame: GifFrame) => void
  ) => void;
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
  const canvasSizeSetRef = React.useRef<boolean>(false);
  const scriptLoadedRef = React.useRef<boolean>(false);
  const frameCountRef = React.useRef<number>(0);
  const giflerInstanceRef = React.useRef<GiflerInstance | null>(null);

  React.useEffect(() => {
    const loadGif = () => {
      if (!window.gifler) {
        onError?.(new Error("Gifler library not loaded"));
        return;
      }

      try {
        frameCountRef.current = 0;

        const onDrawFrame = (
          ctx: CanvasRenderingContext2D,
          frame: GifFrame
        ) => {
          frameCountRef.current++;

          // Set canvas size once based on the full GIF dimensions
          if (
            !canvasSizeSetRef.current &&
            frame.buffer.width &&
            frame.buffer.height
          ) {
            const gifWidth = frame.buffer.width;
            const gifHeight = frame.buffer.height;
            canvas.width = gifWidth;
            canvas.height = gifHeight;
            canvasSizeSetRef.current = true;
          }

          // Draw frame
          ctx.drawImage(frame.buffer, frame.x, frame.y);
          imageRef.current?.getLayer()?.batchDraw();

          // If we've seen many frames (indicating we might be near the end),
          // restart the animation to avoid the last frame
          if (frameCountRef.current > 30) {
            // Adjust this number based on your GIF
            frameCountRef.current = 0;
            // Restart the GIF
            setTimeout(() => {
              if (giflerInstanceRef.current) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                giflerInstanceRef.current.frames(canvas, onDrawFrame);
              }
            }, 100);
          }
        };

        giflerInstanceRef.current = window.gifler(src);
        giflerInstanceRef.current.frames(canvas, onDrawFrame);
        onLoad?.();
      } catch (error) {
        onError?.(error as Error);
      }
    };

    if (scriptLoadedRef.current) {
      loadGif();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://unpkg.com/gifler@0.1.0/gifler.min.js";

    script.onload = () => {
      scriptLoadedRef.current = true;
      loadGif();
    };

    script.onerror = () => {
      onError?.(new Error("Failed to load gifler library"));
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        script.remove();
      }
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
