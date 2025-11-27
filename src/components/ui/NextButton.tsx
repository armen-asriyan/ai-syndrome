import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";
import { motion } from "motion/react";
import { usePageController } from "@/context/PageController";

export const NextButton = () => {
  const { goToNext, isNextButtonVisible } = usePageController();

  return (
    <motion.div
      className="fixed bottom-24 w-full flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNextButtonVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: isNextButtonVisible ? "all" : "none" }}
    >
      <motion.div
        animate={{ y: 12 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next"
          onClick={goToNext}
          className="rounded-full p-4 cursor-pointer"
        >
          <ChevronsDown className="size-20 stroke-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
};
