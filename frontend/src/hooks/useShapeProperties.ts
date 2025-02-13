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
      strokeWidth: getProperties("strokeWidth", properties),
      dash: getProperties("strokeStyle", properties),
      lineCap: "round",
      draggable: true,
    };

    switch (currentToolBar) {
      case "cursor": {
        setToolBarProperties(null);
        break;
      }
      case "rectangle": {
        setToolBarProperties({
          type: "rectangle",
          cornerRadius: getProperties("edgeStyle", properties),
          customProperties: properties,
          ...commonProperties,
        });
        break;
      }
      case "circle": {
        setToolBarProperties({
          type: "circle",
          customProperties: properties,
          ...commonProperties,
        });
        break;
      }
    }
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
