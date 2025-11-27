import { PageControllerProvider } from "@/context/PageController";
import { Section } from "@/components/Section";
import { NextButton } from "@/components/ui/NextButton";
import Intro from "./components/pages/Intro";
import FullBorders from "./components/FullBorders";
import AIReplacementFear from "./components/pages/AIReplacementFear";
import JuniorDeveloperDilemma from "./components/pages/JuniorDevDilemma";
import IntrinsicValues from "./components/pages/IntrinsicValues";

function App() {
  return (
    <PageControllerProvider>
      <main className="overflow-x-hidden overflow-y-scroll h-screen snap-y snap-mandatory relative">
        <FullBorders />

        <Section id="intro">{(ref) => <Intro ref={ref} />}</Section>

        <Section id="ai-fear-page">
          {(ref) => <AIReplacementFear ref={ref} />}
        </Section>

        <Section id="junior-dilemma-page">
          {(ref) => <JuniorDeveloperDilemma ref={ref} />}
        </Section>

        <Section id="intrinsic-values-page">
          {(ref) => <IntrinsicValues ref={ref} />}
        </Section>

        <NextButton />
      </main>
    </PageControllerProvider>
  );
}

export default App;
