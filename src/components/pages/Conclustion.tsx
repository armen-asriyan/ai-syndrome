import { motion, useAnimationControls } from "motion/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";

// Mock context for standalone demo
const usePageController = () => ({
  showNextButton: (delay: number) =>
    console.log(`Show button after ${delay}ms`),
});

type SectionHandle = {
  playExit: () => Promise<void>;
  onNext?: () => Promise<void>;
};

const Conclusion = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();

  const contentExit = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await contentExit.start({
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.8 },
      });
    },
  }));

  useEffect(() => {
    const sectionElement = document.getElementById("conclusion-page");
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showNextButton(5000);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionElement);
    return () => observer.disconnect();
  }, [showNextButton]);

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center px-8 bg-linear-to-br from-slate-900 via-purple-900 to-violet-900 overflow-hidden"
      id="conclusion-page"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        animate={contentExit}
        className="relative z-10 text-center max-w-4xl"
      >
        {/* Main Merci */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
          className="text-9xl font-bold mb-8 bg-linear-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent"
        >
          Merci
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-2xl text-purple-200 mb-6"
        >
          Pour votre attention
        </motion.p>

        {/* Key Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-xl text-purple-100/90 leading-relaxed space-y-4 mb-12"
        >
          <p>
            Le futur est entre vos mains, et il est plus passionnant que jamais.
          </p>
        </motion.div>

        {/* Author */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="text-lg text-purple-300 italic"
        >
          — Armen Asriyan
        </motion.p>
      </motion.div>

      {/* Decorative Sparkles */}
      {[
        { x: "10%", y: "15%", size: "text-6xl", delay: 0.8, duration: 3 },
        { x: "85%", y: "20%", size: "text-5xl", delay: 1.2, duration: 3.5 },
        { x: "15%", y: "75%", size: "text-7xl", delay: 1, duration: 4 },
        { x: "80%", y: "70%", size: "text-6xl", delay: 1.4, duration: 3.2 },
        { x: "50%", y: "10%", size: "text-4xl", delay: 0.9, duration: 3.8 },
        { x: "90%", y: "50%", size: "text-5xl", delay: 1.3, duration: 3.3 },
      ].map((sparkle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: sparkle.delay },
            scale: { duration: 0.6, delay: sparkle.delay, ease: "backOut" },
            rotate: { duration: 0.6, delay: sparkle.delay },
            y: {
              duration: sparkle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute ${sparkle.size}`}
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating Circles */}
      {[
        { x: "5%", y: "25%", size: 96, color: "violet", delay: 0.6 },
        { x: "88%", y: "35%", size: 128, color: "fuchsia", delay: 0.9 },
        { x: "12%", y: "60%", size: 112, color: "pink", delay: 0.7 },
        { x: "85%", y: "80%", size: 80, color: "purple", delay: 1.1 },
      ].map((circle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.15, scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            opacity: { duration: 1, delay: circle.delay },
            scale: {
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`absolute bg-${circle.color}-400 rounded-full blur-2xl`}
          style={{
            left: circle.x,
            top: circle.y,
            width: circle.size,
            height: circle.size,
            zIndex: 0,
          }}
        />
      ))}

      {/* Rotating Border Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-purple-400/20 rounded-full"
        style={{ zIndex: 0 }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border-2 border-fuchsia-400/20 rounded-full"
        style={{ zIndex: 0 }}
      />

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-8 text-8xl"
        style={{ zIndex: 0 }}
      >
        💫
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50, y: -50 }}
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-8 right-8 text-8xl"
        style={{ zIndex: 0 }}
      >
        🌟
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 left-8 text-8xl"
        style={{ zIndex: 0 }}
      >
        ⭐
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        whileInView={{ opacity: 0.3, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 right-8 text-8xl"
        style={{ zIndex: 0 }}
      >
        🎯
      </motion.div>

      {/* Subtle Light Rays */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-linear-to-b from-transparent via-purple-300 to-transparent"
        style={{ zIndex: 0 }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-linear-to-r from-transparent via-fuchsia-300 to-transparent"
        style={{ zIndex: 0 }}
      />
    </section>
  );
});

export default Conclusion;
