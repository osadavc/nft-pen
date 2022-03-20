import useMediaQuery from "../../hooks/useMediaQuery";

interface ButtonProps {
  onClick: () => void;
  width?: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, width = 190 }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 font-semibold md:px-0"
      style={{ width: !isMobile ? `${width}px` : "unset" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
