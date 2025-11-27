import { motion, useAnimationControls } from "motion/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { usePageController } from "@/context/PageController";
import type { SectionHandle } from "@/context/PageController";

const AIReplacementFear = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();

  // Exit animation controls
  const titleExit = useAnimationControls();
  const cardsExit = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await Promise.all([
        titleExit.start({ y: -100, opacity: 0, transition: { duration: 0.8 } }),
        cardsExit.start({
          y: 50,
          opacity: 0,
          transition: { duration: 0.6, staggerChildren: 0.1 },
        }),
      ]);
    },
  }));

  useEffect(() => {
    const sectionElement = document.getElementById("ai-fear-page");
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
      className="relative h-screen flex flex-col items-center justify-center px-8"
      id="ai-fear-page"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        animate={titleExit}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold mb-4 text-black">
          La Peur du Remplacement par l'IA
        </h2>
        <p className="text-2xl text-black/80">Une Réalité à Gérer</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
        animate={cardsExit}
      >
        {/* Card 1: Automatisation */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="bg-linear-to-br from-blue-500 to-cyan-500 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "backOut" }}
            className="text-6xl mb-6"
          >
            ✨
          </motion.div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Automatisation des Tâches
          </h3>
          <p className="text-white text-xl leading-relaxed">
            L'IA est de plus en plus capable d'automatiser des tâches
            répétitives et prévisibles, ce qui peut créer une anxiété légitime
            quant à la pertinence des rôles traditionnels.
          </p>
        </motion.div>

        {/* Card 2: Syndrome de l'Imposteur */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
          className="bg-linear-to-br from-purple-500 to-pink-500 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.9, ease: "backOut" }}
            className="text-6xl mb-6"
          >
            😰
          </motion.div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Syndrome de l'Imposteur
          </h3>
          <p className="text-white text-xl leading-relaxed">
            Ces avancées technologiques peuvent exacerber le syndrome de
            l'imposteur, nous poussant à douter de nos compétences et de notre
            valeur.
          </p>
        </motion.div>

        {/* Card 3: Incertitude Professionnelle */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          className="bg-linear-to-br from-indigo-500 to-violet-500 backdrop-blur-sm border border-indigo-400/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-violet-500/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 2.3, ease: "backOut" }}
            className="text-6xl mb-6"
          >
            ❓
          </motion.div>
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Incertitude Professionnelle
          </h3>
          <p className="text-white text-xl leading-relaxed">
            Les développeurs juniors se posent des questions sur leur avenir :
            comment progresser si l'IA remplace les rôles d'entrée de gamme ?
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        whileInView={{ opacity: 0.3, scale: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3, ease: "backOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="absolute top-10 right-10 w-32 h-32 border-4 border-pink-400 rounded-full"
        style={{ zIndex: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        whileInView={{ opacity: 0.3, scale: 1, rotate: -360 }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          scale: { duration: 0.8, delay: 0.5, ease: "backOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        }}
        className="absolute bottom-20 left-10 w-40 h-40 border-4 border-cyan-400 rounded-full"
        style={{ zIndex: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
        className="absolute top-32 left-20 text-7xl"
        style={{ zIndex: 0 }}
      >
        ✨
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        whileInView={{ opacity: 0.4, scale: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 0.8, delay: 1, ease: "backOut" },
          y: { duration: 3, repeat: Infinity, repeatType: "reverse" },
        }}
        className="absolute bottom-40 right-32 w-32 h-32 bg-linear-to-br from-purple-400/40 to-indigo-400/40 rounded-full blur-xl"
        style={{ zIndex: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "backOut" }}
        className="absolute top-40 right-24 text-6xl"
        style={{ zIndex: 0 }}
      >
        ✨
      </motion.div>
      <div className="absolute bottom-[-150px] right-[-150px] text-[15rem] rotate-180 opacity-50">
        ✨
      </div>
    </section>
  );
});

export default AIReplacementFear;
