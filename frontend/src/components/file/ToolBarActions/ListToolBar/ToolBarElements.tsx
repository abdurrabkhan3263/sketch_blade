import React, { useState } from "react";
import ToolBarActions from "./const.ts";
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group.tsx";

interface ContainerProps {
  children: React.ReactNode;
  label: string;
}

const ColorContainer = ({ color }: { color: string }) => {
  return <div className={"size-full"} style={{ backgroundColor: color }} />;
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

const IconContainer = ({ icon, value }: { icon: string; value: string }) => {
  return <img src={icon} className={"size-full object-cover"} alt={value} />;
};

// Components for Background, Fill, StrokeStyle, StrokeWidth
const Background = () => {
  const handleChangeBackground = (color: string) => {
    console.log(color);
  };

  return (
    <Container label={"Background"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"#3282B8"}>
        {ToolBarActions.backgroundColors.map((color, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
            onClick={handleChangeBackground}
          >
            <ColorContainer color={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const Stroke = () => {
  const handleStrokeChange = (color: string) => {
    console.log("Stroke:: ", color);
  };
  return (
    <Container label={"Stroke"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"#0A1F2C"}>
        {ToolBarActions.strokeColors.map((color, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
            onClick={handleStrokeChange}
          >
            <ColorContainer color={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const Fill = () => {
  const handleFillChange = (style: string) => {
    console.log("Fill:: ", style);
  };

  return (
    <Container label={"Fill"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"SOLID"}>
        {ToolBarActions.fillStyles.map(({ path, color }, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
            onClick={handleFillChange}
          >
            <IconContainer icon={path} value={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const StrokeStyle = () => {
  const handleStrokeStyleChange = (style: string) => {
    console.log("StrokeStyle:: ", style);
  };

  return (
    <Container label={"Stroke style"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"SOLID"}>
        {ToolBarActions.strokeStyles.map(({ style, path }, index) => (
          <ToggleGroupItem
            key={index}
            value={style}
            aria-label={`Toggle ${style}`}
            onClick={handleStrokeStyleChange}
          >
            <IconContainer icon={path} value={style} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const StrokeWidth = () => {
  const handleStrokeWidthChange = (style: string) => {
    console.log("StrokeWidth:: ", style);
  };

  return (
    <Container label={"Stroke width"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"THIN"}>
        {ToolBarActions.strokeWidth.map(({ width, path }, index) => (
          <ToggleGroupItem
            key={index}
            value={width}
            aria-label={`Toggle ${width}`}
            onClick={handleStrokeWidthChange}
          >
            <IconContainer icon={path} value={width} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const EdgeStyle = () => {
  const handleEdgeStyleChange = (style) => {
    console.log(style);
  };

  return (
    <Container label={"Edge Style"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"ROUNDED"}>
        {ToolBarActions.edgeRounded.map(({ path, style }, index) => (
          <ToggleGroupItem
            key={index}
            value={style}
            aria-label={`Toggle ${style}`}
            onClick={handleEdgeStyleChange}
          >
            <IconContainer icon={path} value={style} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
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
    </Container>
  );
};

const EraserRadius: React.FC = () => {
  const [rangeValue, setRangeValue] = useState<number>(100);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setRangeValue(newValue);
  };

  return (
    <Container label={"Radius"}>
      <input
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        className={"w-full"}
      />
    </Container>
  );
};

const FontSize: React.FC = () => {
  return (
    <Container label={"Font Size"}>
      <ToggleGroup type="single" className={"gap-2"} defaultValue={"MEDIUM"}>
        {ToolBarActions.fontSize.map(({ Icon, size }) => {
          return (
            <ToggleGroupItem value={size} aria-label={`Toggle ${size}`}>
              <Icon className="size-full object-cover" />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Container>
  );
};

export {
  Background,
  Fill,
  StrokeStyle,
  StrokeWidth,
  Stroke,
  Opacity,
  EdgeStyle,
  EraserRadius,
  FontSize,
};
