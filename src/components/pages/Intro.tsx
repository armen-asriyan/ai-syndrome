import { motion, useAnimationControls } from "motion/react";
import RotatingBorderTitle from "@/components/RotatingBorderTitle";
import Typewriter from "typewriter-effect";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { usePageController } from "@/context/PageController";
import type { SectionHandle } from "@/context/PageController";

const Intro = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();

  // New exit animation controls
  const titleExit = useAnimationControls();
  const imageExit = useAnimationControls();
  const authorExit = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await Promise.all([
        titleExit.start({ y: -120, opacity: 0, transition: { duration: 0.8 } }),
        imageExit.start({ y: -100, opacity: 0, transition: { duration: 0.7 } }),
        authorExit.start({ opacity: 0, transition: { duration: 0.4 } }),
      ]);
    },
    onNext: async () => {
      const video = document.querySelector<HTMLVideoElement>("#intro-video");
      if (!video) return;

      video.classList.remove("hidden");
      await video.play(); // Wait until video starts
      return new Promise<void>((resolve) => {
        video.onended = () => resolve(); // Resolve after video ends
      });
    },
  }));

  useEffect(() => {
    // Only show button if this is the current section
    const sectionElement = document.getElementById("intro-page");
    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          showNextButton(4000);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, [showNextButton]);

  return (
    <>
      <section className="overflow-hidden relative h-screen" id="intro-page">
        <div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: "easeInOut" }}
            animate={titleExit}
            className="relative z-2 w-fit mx-auto"
          >
            <RotatingBorderTitle>
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.3, delay: 0.8, ease: "easeInOut" }}
              >
                Craintes liées à l'IA, syndrome de l'imposteur
              </motion.h1>
            </RotatingBorderTitle>

            <motion.img
              src="img/imposter.png"
              alt="Imposter"
              className="absolute top-[-220%] right-[15%] w-40 -z-1 scale-x-[-1] -rotate-10"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.5, ease: "easeInOut" }}
              animate={imageExit}
            />
          </motion.div>
        </div>

        <motion.h3
          className="text-3xl absolute top-[60%] left-1/2 -translate-x-1/2"
          animate={titleExit}
        >
          <Typewriter
            options={{ cursor: "|" }}
            onInit={(typewriter) => {
              typewriter
                .callFunction((state) => {
                  state.elements.cursor.style.transform = "translateY(-4px)";
                  state.elements.cursor.style.display = "none";
                })
                .pauseFor(500)
                .changeDelay(40)
                .typeString("L'avenir arrive vite,")
                .pauseFor(150)
                .typeString(" comment rester confiants ?")
                .callFunction((state) => {
                  state.elements.cursor.style.display = "inline-block";
                })
                .start();
            }}
          />
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 4, ease: "easeOut" }}
          className="absolute bottom-9 right-6 text-lg"
          animate={authorExit}
        >
          par Armen Asriyan
        </motion.p>
      </section>

      <div className="overflow-hidden w-1/2 h-fit absolute bottom-[-5%] left-1">
        <video
          id="intro-video"
          src="video/vent.webm"
          playsInline
          className="pointer-events-none ml-2 w-full hidden"
          onEnded={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
    </>
  );
});

export default Intro;
