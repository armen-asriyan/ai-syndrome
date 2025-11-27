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

const OpportunityFromThreat = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();

  const titleExit = useAnimationControls();
  const contentExit = useAnimationControls();
  const quoteExit = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await Promise.all([
        titleExit.start({ y: -100, opacity: 0, transition: { duration: 0.8 } }),
        contentExit.start({
          x: 100,
          opacity: 0,
          transition: { duration: 0.7 },
        }),
        quoteExit.start({
          scale: 0.8,
          opacity: 0,
          transition: { duration: 0.6 },
        }),
      ]);
    },
  }));

  useEffect(() => {
    const sectionElement = document.getElementById("opportunity-page");
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
      className="relative h-screen flex items-center justify-center px-12 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden"
      id="opportunity-page"
    >
      {/* Left Side - Title & Quote */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        animate={titleExit}
        className="w-1/2 pr-12"
      >
        <h2 className="text-7xl font-bold mb-8 bg-linear-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Transformer la Menace en Opportunité
        </h2>
        <p className="text-2xl text-gray-700 mb-12 leading-relaxed">
          L'IA n'est pas une fatalité, mais un catalyseur pour l'évolution de
          nos rôles
        </p>

        {/* Quote Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          animate={quoteExit}
          className="bg-white/60 backdrop-blur-lg border-l-4 border-fuchsia-500 rounded-xl p-6 shadow-xl"
        >
          <p className="text-lg text-gray-900 italic leading-relaxed mb-3">
            " Votre créativité, votre pensée critique et votre capacité à
            interagir humainement sont des atouts que l'IA ne pourra pas
            remplacer"
          </p>
          <p className="text-base text-fuchsia-700 font-semibold">
            Ces qualités humaines sont notre avantage irremplaçable.
          </p>
        </motion.div>
      </motion.div>

      {/* Right Side - Staircase/Steps Visual */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
        animate={contentExit}
        className="w-1/2 relative h-[600px]"
      >
        {/* Adaptation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[70%]"
        >
          <div className="bg-linear-to-r from-violet-500 to-purple-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">📚</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Adaptation Continue</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Investissez dans l'apprentissage de l'IA et de ses
                  applications
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collaboration */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="absolute top-[140px] right-0 w-[80%]"
        >
          <div className="bg-linear-to-r from-fuchsia-500 to-pink-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">🤝</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Collaboration avec l'IA
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Utilisez l'IA comme un outil pour augmenter votre productivité
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute top-[280px] right-0 w-[85%]"
        >
          <div className="bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">💡</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Focus sur les Soft Skills
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Compétences essentielles pour le leadership et la gestion
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Innovation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
          className="absolute top-[420px] right-0 w-[90%]"
        >
          <div className="bg-linear-to-r from-purple-500 to-violet-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <span className="text-5xl">🚀</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">Innover et Créer</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Créativité et résolution de problèmes non structurés
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute top-10 left-20 w-80 h-80 bg-violet-400 rounded-full blur-3xl"
        style={{ zIndex: -1 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-32 right-32 w-96 h-96 bg-fuchsia-400 rounded-full blur-3xl"
        style={{ zIndex: -1 }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-24 w-32 h-32 border-4 border-pink-300 rounded-full opacity-30"
        style={{ zIndex: -1 }}
      />
    </section>
  );
});

export default OpportunityFromThreat;
