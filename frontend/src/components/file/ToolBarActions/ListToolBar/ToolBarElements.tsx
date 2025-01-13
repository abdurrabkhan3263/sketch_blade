import React, { useState } from "react";
import ToolBarActions from "./const.ts";

interface ColorContainerProps {
  color: string;
  handleClick: (color: string) => void;
}

interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

interface IconContainerProps {
  icon: string;
  handleClick: (style: string) => void;
  value: string;
}

// Wrapper for color container

const ColorContainer: React.FC<ColorContainerProps> = ({
  color,
  handleClick,
}) => {
  return (
    <div
      className={"h-6 w-6 rounded-md"}
      style={{ backgroundColor: color }}
      onClick={() => handleClick(color)}
    />
  );
};

const Container: React.FC<ContainerProps> = ({ children, label }) => {
  return (
    <div className={"flex flex-col gap-y-2"}>
      <span>
        <p className={"text-xs font-medium"}>{label}</p>
      </span>
      <div className={"flex flex-wrap gap-2"}>{children}</div>
    </div>
  );
};

const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  handleClick,
  value,
}: IconContainerProps) => {
  return (
    <button
      autoFocus
      className={
        "flex-center h-7 w-7 rounded-md bg-tertiary p-1 text-gray-500 outline-white focus:outline-1 active:border"
      }
      onClick={() => handleClick(value)}
    >
      <span className={"inline-block size-full text-blue-500"}>
        <img
          src={icon}
          className={"size-full fill-blue-500 object-cover"}
          alt={value}
        />
      </span>
    </button>
  );
};

// Components for Background, Fill, StrokeStyle, StrokeWidth

const Background = () => {
  const handleChangeBackground = (color: string) => {
    console.log(color);
  };

  return (
    <Container label={"Background"}>
      {ToolBarActions.backgroundColors.map((color, index) => (
        <ColorContainer
          color={color}
          key={index}
          handleClick={handleChangeBackground}
        />
      ))}
    </Container>
  );
};

const Stroke = () => {
  const handleStrokeChange = (color: string) => {
    console.log("Stroke:: ", color);
  };
  return (
    <Container label={"Stroke"}>
      {ToolBarActions.strokeColors.map((color, index) => (
        <ColorContainer
          color={color}
          key={index}
          handleClick={handleStrokeChange}
        />
      ))}
    </Container>
  );
};

const Fill = () => {
  const handleFillChange = (style: string) => {
    console.log("Fill:: ", style);
  };

  return (
    <Container label={"Fill"}>
      {ToolBarActions.fillStyles.map((style, index) => (
        <IconContainer
          key={index}
          icon={`/assets/icons/${style.toLowerCase()}.svg`}
          handleClick={(style) => handleFillChange(style)}
          value={style}
        />
      ))}
    </Container>
  );
};

const StrokeStyle = () => {
  const handleStrokeStyleChange = (style: string) => {
    console.log("StrokeStyle:: ", style);
  };

  return (
    <Container label={"Stroke style"}>
      {ToolBarActions.strokeStyles.map((style, index) => (
        <IconContainer
          key={index}
          icon={`/assets/icons/${style.toLowerCase()}-line.svg`}
          handleClick={(style) => handleStrokeStyleChange(style)}
          value={style}
        />
      ))}
    </Container>
  );
};

const StrokeWidth = () => {
  const handleStrokeWidthChange = (style: string) => {
    console.log("StrokeWidth:: ", style);
  };

  return (
    <Container label={"Stroke width"}>
      {ToolBarActions.strokeWidth.map((width, index) => (
        <IconContainer
          key={index}
          icon={`/assets/icons/${width.toLowerCase() === "thin" ? "solid" : width.toLowerCase()}-line.svg`}
          handleClick={(style) => handleStrokeWidthChange(style)}
          value={width}
        />
      ))}
    </Container>
  );
};

const Opacity: React.FC = () => {
  const [rangeValue, setRangeValue] = useState<number>(100);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setRangeValue(newValue);
  };

  return (
    <Container label="Opacity">
      <input
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        className={"w-full"}
      />
      <span></span>
    </Container>
  );
};


export { Background, Fill, StrokeStyle, StrokeWidth, Stroke, Opacity };
