import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import {
  Fill,
  StrokeStyle,
  EdgeStyle,
  Stroke,
  StrokeWidth,
  FillStyle,
  FontSize,
  Opacity,
  EraserRadius,
} from "./ToolBarElements.tsx";
import Container from "./Container.tsx";
import { ToolBarProperties } from "../../../lib/types/index.ts";

const ToolBarAction = () => {
  const { toolBarProperties } = useSelector(
    (state: RootState) => state.app as { toolBarProperties: ToolBarProperties },
  );

  if (!toolBarProperties) return <></>;

  const propertiesElement = {
    fill: <Fill />,
    stroke: <Stroke />,
    fillStyle: <FillStyle />,
    strokeStyle: <StrokeStyle />,
    strokeWidth: <StrokeWidth />,
    edgeStyle: <EdgeStyle />,
    fontSize: <FontSize />,
    eraserRadius: <EraserRadius />,
    opacity: <Opacity />,
  };

  return (
    <Container>
      {Object.keys(propertiesElement).map((key, index) =>
        toolBarProperties[key as keyof ToolBarProperties] ? (
          <span key={index}>
            {
              propertiesElement[
                key as keyof typeof propertiesElement
              ] as React.ReactNode
            }
          </span>
        ) : null,
      )}
    </Container>
  );
};
export default ToolBarAction;
