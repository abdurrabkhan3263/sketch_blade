import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { getProperties } from "../lib/utils.ts";
import { ToolBarProperties, UseShapeProperties } from "../lib/types/index.ts";
import { ToolBarArr } from "../lib/const.ts";

const useShapeProperties = (): UseShapeProperties | null => {
  const [toolBarProperties, setToolBarProperties] =
    useState<UseShapeProperties | null>(null);
  const { currentToolBar, toolBarProperties: properties } = useSelector(
    (state: RootState) => state.app,
  );

  useEffect(() => {
    if (!properties) return;

    // const commonProperties = {
    //   fill: properties["fill"],
    //   fillStyle: properties["fillStyle"],
    //   stroke: properties["stroke"],
    //   lineCap: "round",
    //   draggable: true,
    // };

    if (ToolBarArr.includes(currentToolBar)) {
      const allProperties = getProperties(
        Object.keys(properties) as (keyof ToolBarProperties)[],
        properties,
      );
      setToolBarProperties({
        type: currentToolBar,
        customProperties: properties,
        ...allProperties,
      } as UseShapeProperties);
    } else {
      setToolBarProperties(null);
    }
    // switch (currentToolBar) {
    //   case "rectangle": {
    //     const otherProperties = getProperties(
    //       ["strokeWidth", "strokeStyle", "edgeStyle"],
    //       properties,
    //     );

    //     setToolBarProperties({
    //       type: "rectangle",
    //       customProperties: properties,
    //       ...commonProperties,
    //       ...otherProperties,
    //     } as UseShapeProperties);

    //     break;
    //   }
    //   case "circle": {
    //     const otherProperties = getProperties(
    //       ["strokeWidth", "strokeStyle"],
    //       properties,
    //     );
    //     setToolBarProperties({
    //       type: "circle",
    //       customProperties: properties,
    //       ...otherProperties,
    //       ...commonProperties,
    //     } as UseShapeProperties);

    //     break;
    //   }
    //   case "free hand": {
    //     const otherProperties = getProperties(
    //       ["strokeWidth", "strokeStyle"],
    //       properties,
    //     );

    //     setToolBarProperties({
    //       type: "free hand",
    //       stroke: properties["stroke"],
    //       customProperties: properties,
    //       opacity: properties["opacity"],
    //       ...otherProperties,
    //     } as UseShapeProperties);

    //     break;
    //   }
    //   case "arrow": {
    //     const allProperties = getProperties(
    //       Object.keys(properties) as (keyof ToolBarProperties)[],
    //       properties,
    //     );

    //     console.log(allProperties);
    //     break;
    //   }
    //   default: {
    //     setToolBarProperties(null);
    //   }
    // }
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
