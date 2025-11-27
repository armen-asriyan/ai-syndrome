import { motion, useAnimationControls } from "motion/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { usePageController } from "@/context/PageController";
import type { SectionHandle } from "@/context/PageController";

const JuniorDeveloperDilemma = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();

  // Exit animation controls
  const titleExit = useAnimationControls();
  const contentExit = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await Promise.all([
        titleExit.start({
          scale: 0.8,
          opacity: 0,
          transition: { duration: 0.7 },
        }),
        contentExit.start({
          x: -100,
          opacity: 0,
          transition: { duration: 0.6, staggerChildren: 0.15 },
        }),
      ]);
    },
  }));

  useEffect(() => {
    const sectionElement = document.getElementById("junior-dilemma-page");
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
      className="relative h-screen flex flex-col items-center justify-center px-8 bg-linear-to-br from-slate-50 to-blue-50"
      id="junior-dilemma-page"
    >
      {/* Title Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        animate={titleExit}
        className="text-center mb-12 max-w-4xl"
      >
        <h2 className="text-6xl font-bold mb-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Le Dilemme du Développeur Junior
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          Si l'IA remplace les juniors mais pas les seniors, comment devient-on
          senior ? La réponse : le rôle junior évolue.
        </p>
      </motion.div>

      {/* Main Content - Three Columns */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full"
        animate={contentExit}
      >
        {/* Column 1: Remplacement Junior */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
            <motion.div
              initial={{ rotate: -10, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "backOut" }}
              className="text-7xl mb-6 text-center"
            >
              🤖
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-red-600 text-center">
              L'IA Automatise le Basique
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              L'IA prend en charge les tâches simples et répétitives, rendant
              obsolètes les compétences de base d'hier.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-400 to-orange-400"
            />
          </div>
        </motion.div>

        {/* Column 2: Le Pont (Bridge) */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden"
        >
          <div className="bg-linear-to-br from-yellow-50 to-amber-100 rounded-3xl p-8 border-2 border-yellow-300 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: "backOut" }}
                className="text-7xl mb-6 text-center"
              >
                📈
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-amber-700 text-center">
                Évolution des Exigences
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed text-center">
                Le rôle junior ne disparaît pas, il se transforme et exige
                désormais des compétences plus avancées.
              </p>
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.6 }}
              className="h-2 bg-linear-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full mt-6 mx-auto"
            />
          </div>
        </motion.div>

        {/* Column 3: Nécessité de Senior */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative overflow-hidden"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
            <motion.div
              initial={{ rotate: 10, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5, ease: "backOut" }}
              className="text-7xl mb-6 text-center"
            >
              👔
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-green-600 text-center">
              Nouveau Junior = Ancien Mid
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              Les juniors de demain devront maîtriser ce que seuls les mid-level
              maîtrisaient hier : architecture, optimisation, résolution
              complexe.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-green-400 to-emerald-400"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Message */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
        className="mt-12 max-w-4xl text-center"
      >
        <p className="text-lg text-gray-600 italic">
          L'IA ne supprime pas l'échelle de carrière, elle la fait monter d'un
          cran. Les compétences d'aujourd'hui deviennent le minimum de demain.
        </p>
      </motion.div>

      {/* Decorative Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full blur-3xl"
        style={{ zIndex: -1 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl"
        style={{ zIndex: -1 }}
      />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.2, x: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.7 },
          x: { duration: 4, repeat: Infinity, repeatType: "reverse" },
        }}
        className="absolute top-1/2 left-5 w-24 h-24 bg-linear-to-br from-pink-300 to-purple-300 rounded-full blur-2xl"
        style={{ zIndex: -1 }}
      />
    </section>
  );
});

export default JuniorDeveloperDilemma;
