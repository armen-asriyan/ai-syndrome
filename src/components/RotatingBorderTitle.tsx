import { HoverBorderGradient } from "./ui/hover-border-gradient";

const RotatingBorderTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-60 flex justify-center items-center">
      <HoverBorderGradient
        containerClassName="rounded-full bg-linear-to-r from-blue-500 to-purple-500 p-1 bg-white scale-200"
        as="div"
        className="bg-white flex items-center space-x-5 select-none"
      >
        <span
          className="tracking-wider text-4xl text-white drop-shadow-[0_0px_3px_#05377666]"
          style={{ WebkitTextStroke: "1px black" }}
        >
          {children}
        </span>
      </HoverBorderGradient>
    </div>
  );
};

export default RotatingBorderTitle;
