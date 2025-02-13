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
} from "./ListToolBar/ToolBarElements.tsx";
import Container from "./Container.tsx";

const ToolBarAction = () => {
  const { toolBarProperties } = useSelector((state: RootState) => state.app);

  if (!toolBarProperties) return <></>;

  const properties = {
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
      {Object.keys(properties).map((key, index) =>
        toolBarProperties[key] ? (
          <span key={index}>{properties[key]}</span>
        ) : null,
      )}
    </Container>
  );
};
export default ToolBarAction;
