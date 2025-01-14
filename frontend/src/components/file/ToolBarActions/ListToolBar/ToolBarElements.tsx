import React, { useState } from "react";
import ToolBarActions from "./const.ts";
import { EdgeRounded } from "../../../../lib/types";
import { Toggle } from "../../../ui/toggle.tsx";
import { BiBold } from "react-icons/bi";
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group.tsx";
import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { AiOutlineUnderline } from "react-icons/ai";
import {
  TbLetterS as SMALL,
  TbLetterM as MEDIUM,
  TbLetterL as LARGE,
} from "react-icons/tb";
import toolBarAction from "../ToolBarAction.tsx";

interface ColorContainerProps {
  color: string;
  isFocused: boolean;
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
  isFocused: boolean;
}

interface ToolBars {
  id?: string;
  currentStyle?: string;
}

// Wrapper for color container

const ColorContainer: React.FC<ColorContainerProps> = ({
  isFocused,
  color,
  handleClick,
}: ColorContainerProps) => {
  return (
    <div
      className={"h-7 w-7 rounded-md"}
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
  isFocused,
  icon,
  handleClick,
  value,
}: IconContainerProps) => {
  return (
    <button
      className={
        "flex-center h-8 w-8 rounded-md bg-tertiary p-1 text-gray-500 outline-white focus:outline-1 active:border"
      }
      onClick={() => handleClick(value)}
    >
      <span className={"inline-block size-full text-blue-500"}>
        <img src={icon} className={"size-full object-cover"} alt={value} />
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
          isFocused={true}
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
          isFocused={true}
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
          isFocused={false}
          icon={`/assets/icons/${style.toLowerCase()}.svg`}
          handleClick={handleFillChange}
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
          isFocused={false}
          icon={`/assets/icons/${style.toLowerCase()}-line.svg`}
          handleClick={handleStrokeStyleChange}
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
          isFocused={false}
          icon={`/assets/icons/${width.toLowerCase() === "thin" ? "solid" : width.toLowerCase()}-line.svg`}
          handleClick={handleStrokeWidthChange}
          value={width}
        />
      ))}
    </Container>
  );
};

const EdgeStyle = () => {
  const handleEdgeStyleChange = (style) => {
    console.log(style);
  };

  return (
    <Container label={"Edge Style"}>
      {ToolBarActions.edgeRounded.map((edgeStyle, index) => (
        <IconContainer
          key={index}
          isFocused={false}
          value={edgeStyle}
          icon={`/assets/icons/${edgeStyle.toLowerCase()}-edge.svg`}
          handleClick={handleEdgeStyleChange}
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

      <ToggleGroup type="single" className={"gap-2"}>
        {ToolBarActions.fontSize.map((FontSize) => {
          return (
              <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  defaultValue={"Toggle bold"}
              >
                <FontSize className="size-full object-cover" />
              </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Container>
  );
};

const FontFamily: React.FC = () => {
  return (
    <Container label={"Font Family"}>
      <>
        <ToggleGroup type="single" className={"gap-2"}>
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            defaultValue={"Toggle bold"}
          >
            <SMALL className="size-full object-cover" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <GoItalic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
          >
            <AiOutlineUnderline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </>
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
  FontFamily,
};
