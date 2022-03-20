interface ButtonProps {
  onClick: () => void;
  width?: number;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, width = 190 }) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-center rounded-md border py-2 font-semibold"
      style={{ width: `${width}px` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
