import React, { useCallback } from "react";
import ToolBarActions from "./const.ts";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import { changeToolBarPropertiesValue } from "../../../redux/slices/appSlice.ts";
import {
  EdgeStyle as EdgeStyleType,
  FillStyle as FillStyleType,
  FontSize as FontSizeType,
  StrokeStyle as StrokeStyleType,
  StrokeWidth as StrokeWidthType,
} from "../../../lib/types/index.ts";

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

const Fill = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (color: string) => {
      dispatch(
        changeToolBarPropertiesValue({
          fill: color,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Background"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector.fill}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.backgroundColors.map((color, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
            // onClick={handleChangeBackground}
            className={"p-0"}
          >
            <ColorContainer color={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const Stroke = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (color: string) => {
      dispatch(
        changeToolBarPropertiesValue({
          stroke: color,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Stroke"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector.stroke}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.strokeColors.map((color, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
            className={"p-0"}
          >
            <ColorContainer color={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const FillStyle = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (style: FillStyleType) => {
      dispatch(
        changeToolBarPropertiesValue({
          fillStyle: style,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Fill"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector.fillStyle}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.fillStyles.map(({ path, color }, index) => (
          <ToggleGroupItem
            key={index}
            value={color}
            aria-label={`Toggle ${color}`}
          >
            <IconContainer icon={path} value={color} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const StrokeStyle = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (style: StrokeStyleType) => {
      dispatch(
        changeToolBarPropertiesValue({
          strokeStyle: style,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Stroke style"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector.strokeStyle}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.strokeStyles.map(({ style, path }, index) => (
          <ToggleGroupItem
            key={index}
            value={style}
            aria-label={`Toggle ${style}`}
          >
            <IconContainer icon={path} value={style} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const StrokeWidth = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (width: StrokeWidthType) => {
      dispatch(
        changeToolBarPropertiesValue({
          strokeWidth: width,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Stroke width"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector?.strokeWidth || ""}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.strokeWidth.map(({ width, path }, index) => (
          <ToggleGroupItem
            key={index}
            value={width}
            aria-label={`Toggle ${width}`}
          >
            <IconContainer icon={path} value={width} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const EdgeStyle = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (style: EdgeStyleType) => {
      dispatch(
        changeToolBarPropertiesValue({
          edgeStyle: style,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Edge Style"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector.edgeStyle}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.edgeRounded.map(({ path, style }, index) => (
          <ToggleGroupItem
            key={index}
            value={style}
            aria-label={`Toggle ${style}`}
          >
            <IconContainer icon={path} value={style} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Container>
  );
};

const Opacity: React.FC = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const opacityValue = Number.parseFloat(e.target.value);

      if (opacityValue <= 0.15 || opacityValue > 1) return;

      dispatch(
        changeToolBarPropertiesValue({
          opacity: opacityValue,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label="Opacity">
      <input
        type="range"
        min="0.15"
        max="1"
        step="0.01"
        value={selector?.opacity || 0}
        onChange={handleValueChange}
        className={"w-full"}
      />
    </Container>
  );
};

const EraserRadius: React.FC = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeToolBarPropertiesValue({
          eraserRadius: parseInt(e.target.value, 10),
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Radius"}>
      <input
        type="range"
        min="0"
        max="100"
        value={selector.eraserRadius}
        onChange={handleValueChange}
        className={"w-full"}
      />
    </Container>
  );
};

const FontSize: React.FC = () => {
  const selector = useSelector(
    (state: RootState) => state.app.toolBarProperties,
  );
  const dispatch = useDispatch();

  const handleValueChange = useCallback(
    (size: FontSizeType) => {
      dispatch(
        changeToolBarPropertiesValue({
          fontSize: size,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Container label={"Font Size"}>
      <ToggleGroup
        type="single"
        className={"gap-2"}
        value={selector?.fontSize || ""}
        onValueChange={handleValueChange}
      >
        {ToolBarActions.fontSize.map(({ Icon, size }) => {
          return (
            <ToggleGroupItem
              key={size}
              value={size}
              aria-label={`Toggle ${size}`}
            >
              <Icon className="size-full object-cover" />
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </Container>
  );
};

export {
  Fill,
  FillStyle,
  StrokeStyle,
  StrokeWidth,
  Stroke,
  Opacity,
  EdgeStyle,
  EraserRadius,
  FontSize,
};
