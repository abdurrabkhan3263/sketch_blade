import React, { useState} from "react";
import ToolBarActions from "./const.ts";
import { EdgeRounded, FillStyle, StrokeWidth as StrokeWidthType } from "../../../../lib/types";
import { Slider } from "../../../ui/slider.tsx"


interface ColorContainerProps {
  color: string;
  handleClick: (color: string) => void;
}

interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

interface IconContainerProps {
  icon: FillStyle | StrokeWidthType | EdgeRounded;
  handleClick: (style: string) => void;
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
}: IconContainerProps) => (
  <div className={"flex-center h-6 w-6 rounded-md p-2"}>
    <span className={"size-full"} onClick={() => handleClick(icon)}>
      <img src={icon} className={"size-full object-cover"} alt={icon} />
    </span>
  </div>
);

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
          icon={style}
          handleClick={(style) => handleFillChange(style)}
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
          icon={"CROSSHATCH"}
          handleClick={(style) => handleStrokeStyleChange(style)}
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
          icon={width}
          handleClick={(style) => handleStrokeWidthChange(style)}
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
        <span>
        </span>
      </Container>
  );
};


export { Background, Fill, StrokeStyle, StrokeWidth, Stroke, Opacity };
