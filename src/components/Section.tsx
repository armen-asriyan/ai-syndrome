import { useEffect, useRef } from "react";
import { usePageController } from "@/context/PageController";
import type { SectionHandle } from "@/context/PageController";

export const Section = ({
  id,
  children,
}: {
  id: string;
  children: (ref: React.RefObject<SectionHandle>) => React.ReactNode;
}) => {
  const ref = useRef<SectionHandle>(null);
  const { registerSection } = usePageController();

  useEffect(() => {
    registerSection(id, ref as React.RefObject<SectionHandle>);
  }, [id, ref, registerSection]);

  return (
    <section id={id} className="h-screen relative overflow-hidden snap-center">
      {children(ref as React.RefObject<SectionHandle>)}
    </section>
  );
};
