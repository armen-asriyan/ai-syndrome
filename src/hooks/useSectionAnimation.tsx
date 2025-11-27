import { useAnimationControls } from "motion/react";
import { useImperativeHandle } from "react";
import type { SectionHandle } from "@/context/PageController";

export function useSectionAnimation(ref: React.Ref<SectionHandle>) {
  const titleControls = useAnimationControls();
  const imageControls = useAnimationControls();
  const extraControls = useAnimationControls();

  useImperativeHandle(ref, () => ({
    async playExit() {
      await Promise.all([
        titleControls.start({
          y: -100,
          opacity: 0,
          transition: { duration: 0.8 },
        }),
        imageControls.start({
          y: -80,
          opacity: 0,
          transition: { duration: 0.7 },
        }),
        extraControls.start({ opacity: 0, transition: { duration: 0.5 } }),
      ]);
    },
  }));

  return { titleControls, imageControls, extraControls };
}
