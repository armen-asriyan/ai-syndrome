import { motion, useAnimationControls } from "motion/react";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePageController } from "@/context/PageController";
import type { SectionHandle } from "@/context/PageController";
import {
  Stage,
  Layer,
  Image,
  Path,
  Rect,
  Group,
  Circle,
  Line,
  Text,
  Arrow,
} from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import GifKonvaImage from "../GifKonvaImage";
import type { KonvaPointerEvent } from "konva/lib/PointerEvents";
import type { KonvaEventObject } from "konva/lib/Node";

const IntrinsicValues = forwardRef<SectionHandle>((_, ref) => {
  const { showNextButton } = usePageController();
  const [stickmanImage] = useImage("img/stickman.png");

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
          transition: { duration: 0.6 },
        }),
      ]);
    },
  }));

  useEffect(() => {
    const sectionElement = document.getElementById("intrinsic-values-page");
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

  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [smileScaleY, setSmileScaleY] = useState(0.8);
  const [smileY, setSmileY] = useState(15);

  // Drawing state
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#df4b26");
  const [lines, setLines] = useState<{ points: number[]; color: string }[]>([]);
  const isDrawing = useRef(false);

  const codingRef = useRef<Konva.Group>(null);

  useEffect(() => {
    const updateSize = () => {
      if (stageRef.current) {
        setStageSize({
          width: stageRef.current.offsetWidth,
          height: stageRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const checkCollision = (codingNode: Konva.Node, trashbinNode: Konva.Node) => {
    const codingBox = codingNode.getClientRect();
    const trashbinBox = trashbinNode.getClientRect();

    return !(
      codingBox.x > trashbinBox.x + trashbinBox.width ||
      codingBox.x + codingBox.width < trashbinBox.x ||
      codingBox.y > trashbinBox.y + trashbinBox.height ||
      codingBox.y + codingBox.height < trashbinBox.y
    );
  };

  const handleCodingDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    const codingNode = e.target;
    const trashbinNode = stage?.findOne(".trashbin");

    if (trashbinNode && checkCollision(codingNode, trashbinNode)) {
      setSmileScaleY((prev) => prev * -1);
      setSmileY((prev) => (prev === 190 ? 0 : 210));
      codingRef.current?.visible(false);
    }
  };

  const handleMouseDown = (e: KonvaPointerEvent) => {
    if (!isDrawingMode) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target?.getStage()?.getPointerPosition();
    setLines((prev) => [
      ...prev,
      { points: [pos?.x || 0, pos?.y || 0], color: selectedColor },
    ]);
  };

  const handleMouseMove = (e: KonvaPointerEvent) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    setLines((prevLines) => {
      if (prevLines.length === 0) return prevLines;
      const newLines = [...prevLines];
      const lastLine = { ...newLines[newLines.length - 1] };
      lastLine.points = [...lastLine.points, point?.x || 0, point?.y || 0];
      newLines[newLines.length - 1] = lastLine;
      return newLines;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <section
      className="relative h-screen flex flex-col px-8 bg-linear-to-br from-slate-50 to-blue-50"
      id="intrinsic-values-page"
    >
      {/* Title Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
        animate={titleExit}
        className="text-center mb-12 w-fit  self-center mt-12 absolute top-0 left-1/2 transform -translate-x-1/2"
      >
        <h2 className="text-6xl font-bold mb-6 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          La Valeur Intrinsèque du Développeur
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          Compétences Non-Codantes
        </p>
      </motion.div>

      {/* Main Content - Konva Stage */}
      <motion.div
        ref={stageRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
        className="flex-1 w-full relative"
        animate={contentExit}
      >
        {/* Drawing Tools */}
        <div className="absolute top-12 right-4 z-10 flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setIsDrawingMode(!isDrawingMode)}
              className={`px-3 py-1 rounded shadow-md text-sm font-medium transition-colors ${
                isDrawingMode
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              ✏️
            </button>
            <button
              onClick={() => setLines([])}
              className="px-3 py-1 rounded shadow-md text-sm font-medium transition-colors bg-white text-gray-700 hover:bg-gray-100"
            >
              🧽
            </button>
          </div>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-10 h-10 rounded border border-gray-300 shadow-md"
          />
        </div>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {/* Decorative Background Elements */}
            <Circle
              x={40}
              y={80}
              radius={128}
              fill="#C7D2FE"
              opacity={0.5}
              filters={[Konva.Filters.Blur]}
              blurRadius={32}
            />
            <Circle
              x={stageSize.width - 40 - 320}
              y={stageSize.height - 80 - 320}
              radius={160}
              fill="#93C5FD"
              opacity={0.4}
              filters={[Konva.Filters.Blur]}
              blurRadius={32}
            />
            <Circle
              x={50}
              y={stageSize.height}
              radius={160}
              fill="#93C5FD"
              opacity={0.4}
              filters={[Konva.Filters.Blur]}
              blurRadius={32}
            />
            <Group
              x={stageSize.width / 9}
              y={stageSize.height / 4}
              name="stickman-container"
            >
              {/* Stickman */}
              <Image
                image={stickmanImage}
                width={400}
                height={400}
                name="stickman"
              />
              <GifKonvaImage
                src="img/propeller-hat.gif"
                x={100} // ← adjust these two
                y={-50} // ← until it sits right on the head
                width={200}
                height={120}
                draggable
              />
              <Path
                x={120}
                y={smileY}
                data="m136.81 116.53c.69 26.17-64.11 42-81.52-.73"
                fill="white"
                stroke="black"
                scaleX={0.8}
                scaleY={smileScaleY}
                strokeWidth={20}
                lineJoin="round"
                lineCap="round"
                name="smile"
              />
              <Group
                ref={codingRef}
                draggable
                x={10}
                y={-80}
                name="coding"
                onDragEnd={handleCodingDragEnd}
              >
                <Rect
                  x={245}
                  y={195}
                  width={90}
                  height={90}
                  fill="black"
                  strokeWidth={4}
                  cornerRadius={20}
                  shadowEnabled
                />
                <Rect
                  x={250}
                  y={200}
                  width={80}
                  height={80}
                  fill="black"
                  stroke="white"
                  strokeWidth={4}
                  cornerRadius={20}
                  shadowEnabled
                />
                <Path
                  x={270}
                  y={225}
                  data="M12.7361611,0.063952038 C13.2551391,0.263360331 13.5227261,0.869148905 13.3338336,1.41701869 L8.54555162,15.3051026 C8.35665911,15.8529724 7.78281676,16.1354563 7.26383885,15.936048 C6.74486095,15.7366397 6.47727387,15.1308511 6.66616638,14.5829813 L11.4544484,0.694897379 C11.6433409,0.147027596 12.2171832,-0.135456255 12.7361611,0.063952038 Z M2.41421356,8.25614867 L5.94974747,11.9885083 C6.34027176,12.4007734 6.34027176,13.0691871 5.94974747,13.4814522 C5.55922318,13.8937173 4.9260582,13.8937173 4.53553391,13.4814522 L0.292893219,9.0026206 C-0.0976310729,8.59035554 -0.0976310729,7.9219418 0.292893219,7.50967674 L4.53553391,3.03084515 C4.9260582,2.61858008 5.55922318,2.61858008 5.94974747,3.03084515 C6.34027176,3.44311021 6.34027176,4.11152395 5.94974747,4.52378901 L2.41421356,8.25614867 Z M17.5857864,8.25614867 L14.0502525,4.52378901 C13.6597282,4.11152395 13.6597282,3.44311021 14.0502525,3.03084515 C14.4407768,2.61858008 15.0739418,2.61858008 15.4644661,3.03084515 L19.7071068,7.50967674 C20.0976311,7.9219418 20.0976311,8.59035554 19.7071068,9.0026206 L15.4644661,13.4814522 C15.0739418,13.8937173 14.4407768,13.8937173 14.0502525,13.4814522 C13.6597282,13.0691871 13.6597282,12.4007734 14.0502525,11.9885083 L17.5857864,8.25614867 Z"
                  fill="white"
                  stroke="transparent"
                  scaleX={2}
                  scaleY={2}
                  strokeWidth={1}
                />
              </Group>
            </Group>

            <Group name="trashbin" draggable>
              <Rect
                x={stageSize.width / 1.9}
                y={stageSize.height / 1.7}
                width={160}
                height={150}
                fill="white"
                cornerRadius={20}
              />
              <Path
                x={stageSize.width / 2}
                y={stageSize.height / 2}
                data="m16.313 4v-1.813c0-.013 0-.028 0-.043 0-1.184-.96-2.144-2.144-2.144-.003 0-.006 0-.01 0h-6.32c-.002 0-.005 0-.008 0-1.183 0-2.142.959-2.142 2.142 0 .016 0 .031.001.047v-.002 1.813h-5.69v2h.575c.196.023.372.099.515.214l-.002-.002c.119.157.203.346.239.552l.001.008 1.187 15.106c.094 1.84.094 2.118 2.25 2.118h12.462c2.16 0 2.16-.275 2.25-2.113l1.187-15.1c.036-.217.12-.409.242-.572l-.002.003c.141-.113.316-.19.508-.212h.005.575v-2h-5.687zm-9.313-1.813c0-.6.487-.938 1.106-.938h5.734c.618 0 1.162.344 1.162.938v1.813h-8zm-.531 17.813-.64-12h1.269l.656 12zm5.225 0h-1.374v-12h1.375zm3.85 0h-1.275l.656-12h1.269z"
                fill="black"
                stroke="transparent"
                scaleX={10}
                scaleY={10}
                strokeWidth={1}
              />
            </Group>
          </Layer>
          {/* Drawing Layer */}
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-over"
              />
            ))}
          </Layer>

          {/* Soft skill cards  */}
          <Layer>
            <Group>
              <Text
                x={stageSize.width - 200}
                y={500}
                rotation={-90}
                text="Soft Skills"
                fontSize={90}
                fontFamily="Alsina Ultrajada"
                fill="white"
                stroke="black"
                strokeWidth={1.5}
              />
              <Arrow
                x={stageSize.width - 130}
                y={350}
                points={[0, 0, 50, 0]}
                pointerLength={15}
                pointerWidth={15}
                fill="white"
                stroke="black"
                strokeWidth={1.5}
                lineCap="round"
                lineJoin="round"
              />
            </Group>
            {[
              {
                title: "Planification Stratégique",
                text: "Définir les besoins, élaborer des feuilles de route, anticiper les défis.",
                color: "#FEE2E2",
              },
              {
                title: "Design UX/UI",
                text: "Créer des expériences intuitives et agréables pour l'utilisateur.",
                color: "#E0E7FF",
              },
              {
                title: "Tests et Validation",
                text: "Comprendre les retours utilisateurs, adapter et itérer.",
                color: "#DCFCE7",
              },
              {
                title: "Interaction Humaine",
                text: "Communication, collaboration, mentorat et résolution de conflits.",
                color: "#FAE8FF",
              },
            ].map((card, i) => (
              <Group
                key={i}
                draggable
                x={stageSize.width - 50} // → mostly outside the right edge
                y={100 + i * 160} // → vertical stacking
                name={`softskill-${i}`}
              >
                <Rect
                  width={360}
                  height={140}
                  fill={card.color}
                  cornerRadius={20}
                  shadowBlur={10}
                  shadowOpacity={0.2}
                />

                <Group name={`softskill-${i}-content`} y={-45}>
                  <Path
                    x={-10}
                    y={35}
                    scale={{ x: 2, y: 2 }}
                    data="M12.6,13   c0.5-0.2,1.4-0.1,1.7,0.5c0.2,0.5,0.4,1.2,0.4,1.1c0-0.4,0-1.2,0.1-1.6c0.1-0.3,0.3-0.6,0.7-0.7c0.3-0.1,0.6-0.1,0.9-0.1   c0.3,0.1,0.6,0.3,0.8,0.5c0.4,0.6,0.4,1.9,0.4,1.8c0.1-0.3,0.1-1.2,0.3-1.6c0.1-0.2,0.5-0.4,0.7-0.5c0.3-0.1,0.7-0.1,1,0   c0.2,0,0.6,0.3,0.7,0.5c0.2,0.3,0.3,1.3,0.4,1.7c0,0.1,0.1-0.4,0.3-0.7c0.4-0.6,1.8-0.8,1.9,0.6c0,0.7,0,0.6,0,1.1   c0,0.5,0,0.8,0,1.2c0,0.4-0.1,1.3-0.2,1.7c-0.1,0.3-0.4,1-0.7,1.4c0,0-1.1,1.2-1.2,1.8c-0.1,0.6-0.1,0.6-0.1,1   c0,0.4,0.1,0.9,0.1,0.9s-0.8,0.1-1.2,0c-0.4-0.1-0.9-0.8-1-1.1c-0.2-0.3-0.5-0.3-0.7,0c-0.2,0.4-0.7,1.1-1,1.1   c-0.7,0.1-2.1,0-3.1,0c0,0,0.2-1-0.2-1.4c-0.3-0.3-0.8-0.8-1.1-1.1l-0.8-0.9c-0.3-0.4-1-0.9-1.2-2c-0.2-0.9-0.2-1.4,0-1.8   c0.2-0.4,0.7-0.6,0.9-0.6c0.2,0,0.7,0,0.9,0.1c0.2,0.1,0.3,0.2,0.5,0.4c0.2,0.3,0.3,0.5,0.2,0.1c-0.1-0.3-0.3-0.6-0.4-1   c-0.1-0.4-0.4-0.9-0.4-1.5C11.7,13.9,11.8,13.3,12.6,13z"
                    fill="white"
                    stroke="black"
                    strokeWidth={0.5}
                  />

                  <Text
                    text={(i + 1).toString()}
                    x={20}
                    y={65}
                    width={24}
                    fontSize={14}
                    fontStyle="bold"
                    fill="#1F2937"
                    name="count"
                  />
                </Group>

                <Text
                  text={card.title}
                  x={40}
                  y={16}
                  width={320}
                  fontSize={22}
                  fontStyle="bold"
                  fill="#1F2937"
                  name="title"
                />

                <Text
                  text={card.text}
                  x={40}
                  y={54}
                  width={315}
                  fontSize={18}
                  fill="#374151"
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </motion.div>
    </section>
  );
});

export default IntrinsicValues;
