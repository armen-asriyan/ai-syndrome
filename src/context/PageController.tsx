/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, useState } from "react";
import { type ReactNode } from "react";

export interface SectionHandle {
  playExit: () => Promise<void>;
  onNext?: () => Promise<void>; // optional per-section callback
}

interface PageControllerContextType {
  registerSection: (name: string, ref: React.RefObject<SectionHandle>) => void;
  goToNext: () => Promise<void>;
  showNextButton: (delay?: number) => void;
  hideNextButton: () => void;
  isNextButtonVisible: boolean;
}

const PageControllerContext = createContext<PageControllerContextType | null>(
  null
);

export const usePageController = () => {
  const ctx = useContext(PageControllerContext);
  if (!ctx)
    throw new Error(
      "usePageController must be used inside PageControllerProvider"
    );
  return ctx;
};

export const PageControllerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const sections = useRef<Record<string, React.RefObject<SectionHandle>>>({});
  const order = useRef<string[]>([]);
  const currentIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isNextButtonVisible, setNextButtonVisible] = useState(false);

  const registerSection = (
    name: string,
    ref: React.RefObject<SectionHandle>
  ) => {
    sections.current[name] = ref;
    if (!order.current.includes(name)) order.current.push(name);
  };

  const hideNextButton = () => {
    // Clear any pending timeout when hiding
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setNextButtonVisible(false);
  };

  const showNextButton = (delay?: number) => {
    console.log("showNextButton called with delay:", delay);

    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (delay !== undefined && delay > 0) {
      console.log("Setting timeout for:", delay, "ms");
      timeoutRef.current = setTimeout(() => {
        console.log("Timeout fired, showing button");
        setNextButtonVisible(true);
        timeoutRef.current = null;
      }, delay);
    } else {
      console.log("Showing button immediately");
      setNextButtonVisible(true);
    }
  };
  const goToNext = async () => {
    hideNextButton();

    const sectionName = order.current[currentIndex.current];
    const ref = sections.current[sectionName];

    if (!ref?.current) return;

    // Play any per-section callback first (e.g., video)
    if (ref.current.onNext) await ref.current.onNext();

    // Then exit animation
    await ref.current.playExit();

    // Scroll manually AFTER the video/exit animation
    currentIndex.current += 1;

    // Scroll to the next section
    if (currentIndex.current < order.current.length)
      document
        .getElementById(order.current[currentIndex.current])
        ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageControllerContext.Provider
      value={{
        registerSection,
        goToNext,
        hideNextButton,
        showNextButton,
        isNextButtonVisible,
      }}
    >
      {children}
    </PageControllerContext.Provider>
  );
};

export default PageControllerProvider;
