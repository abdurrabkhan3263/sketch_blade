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

    if (ToolBarArr.includes(currentToolBar)) {
      const allProperties = getProperties(
        currentToolBar,
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
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
