import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { getProperties } from "../lib/utils.ts";
import { UseShapeProperties } from "../lib/types/index.ts";

const useShapeProperties = (): UseShapeProperties | null => {
  const [toolBarProperties, setToolBarProperties] =
    useState<UseShapeProperties | null>(null);
  const { currentToolBar, toolBarProperties: properties } = useSelector(
    (state: RootState) => state.app,
  );

  useEffect(() => {
    if (!properties) return;

    const commonProperties = {
      fill: properties["fill"],
      fillStyle: properties["fillStyle"],
      stroke: properties["stroke"],
      lineCap: "round",
      draggable: true,
    };

    switch (currentToolBar) {
      case "cursor": {
        setToolBarProperties(null);
        break;
      }
      case "rectangle": {
        const otherProperties = getProperties(
          ["strokeWidth", "strokeStyle", "edgeStyle"],
          properties,
        );

        setToolBarProperties({
          type: "rectangle",
          customProperties: properties,
          ...commonProperties,
          ...otherProperties,
        } as UseShapeProperties);

        break;
      }
      case "circle": {
        const otherProperties = getProperties(
          ["strokeWidth", "strokeStyle"],
          properties,
        );
        setToolBarProperties({
          type: "circle",
          customProperties: properties,
          ...otherProperties,
          ...commonProperties,
        } as UseShapeProperties);
        break;
      }
    }
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
