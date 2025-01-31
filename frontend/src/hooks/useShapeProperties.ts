import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { getProperties } from "../lib/utils.ts";

const useShapeProperties = () => {
  const [toolBarProperties, setToolBarProperties] = useState(null);
  const { currentToolBar, toolBarProperties: properties } = useSelector(
    (state: RootState) => state.app,
  );

  useEffect(() => {
    const commonProperties = {
      strokeWidth: getProperties("strokeWidth", properties),
      dash: getProperties("strokeStyle", properties),
      lineCap: "round",
    };
    switch (currentToolBar) {
      case "cursor": {
        setToolBarProperties(null);
        break;
      }
      case "rectangle": {
        setToolBarProperties({
          ...properties,
          type: "rectangle",
          draggable: true,
          cornerRadius: getProperties("edgeStyle", properties),
          ...commonProperties,
        });
        break;
      }
      case "circle": {
        setToolBarProperties({
          ...properties,
          type: "circle",
          draggable: true,
          ...commonProperties,
        });
        break;
      }
    }
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
