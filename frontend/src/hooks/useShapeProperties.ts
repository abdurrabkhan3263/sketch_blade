import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { getPropertiesInNumber } from "../lib/utils.ts";

const useShapeProperties = () => {
  const [toolBarProperties, setToolBarProperties] = useState(null);
  const { currentToolBar, toolBarProperties: properties } = useSelector(
    (state: RootState) => state.app,
  );

  useEffect(() => {
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
          strokeWidth: getPropertiesInNumber("strokeWidth", properties),
          cornerRadius: getPropertiesInNumber("edgeStyle", properties),
        });
        break;
      }
      case "circle": {
        setToolBarProperties({
          ...properties,
          type: "circle",
          draggable: true,
          strokeWidth: getPropertiesInNumber("strokeWidth", properties),
        });
        break;
      }
    }
  }, [currentToolBar, properties]);

  return toolBarProperties;
};
export default useShapeProperties;
