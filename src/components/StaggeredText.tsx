import { motion } from "motion/react";

import { type JSX } from "react/jsx-runtime";

interface StaggeredTextProps {
  children: string;
  className?: string;
  duration?: number;
  staggerDelay?: number;
  initialDelay?: number;
  as?: keyof JSX.IntrinsicElements;
}

function StaggeredText({
  children,
  className = "",
  duration = 0.5,
  staggerDelay = 0.03,
  initialDelay = 0,
  as = "span",
}: StaggeredTextProps) {
  // @ts-expect-error: Type 'string' is not assignable to type 'keyof JSX.IntrinsicElements'.
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: duration,
            delay: initialDelay + i * staggerDelay,
            ease: "easeOut",
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default StaggeredText;
