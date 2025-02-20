import { createSlice } from "@reduxjs/toolkit";
import { ToolBarProperties, ToolBarElem, Shape } from "../../lib/types";
import { toolBarProperties } from "../../lib/const.ts";
import { getProperties } from "../../lib/utils.ts";

type StateType = {
  currentToolBar: ToolBarElem;
  toolBarProperties: ToolBarProperties | null;
  shapes: Shape[];
  selectedShapesId: string[];
};

const initialState: StateType = {
  currentToolBar: "cursor",
  toolBarProperties: null,
  shapes: [],
  selectedShapesId: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeCurrentToolBar: (state, action) => {
      const payload: ToolBarElem = action.payload;
      state.currentToolBar = action.payload;

      if (state.selectedShapesId.length > 0) return;

      if (payload === "cursor" || payload === "hand") {
        state.toolBarProperties = null;
      } else {
        state.toolBarProperties = toolBarProperties[payload];
      }
    },
    changeToolBarPropertiesValue: (state, action) => {
      state.toolBarProperties = {
        ...state.toolBarProperties,
        ...action.payload,
      };

      if (!state.shapes || !state.selectedShapesId.length || !action.payload)
        return;

      state.selectedShapesId.forEach((id) => {
        const shapeIndex =
          state.shapes.findIndex((shape) => shape.id === id) ?? -1;

        if (shapeIndex !== -1) {
          const propertyKey: ToolBarPropertyKeys = Object.keys(
            action.payload,
          )[0] as ToolBarPropertyKeys;

          const updatedProperties = getProperties(
            [propertyKey],
            action.payload,
          );

          state.shapes[shapeIndex] = {
            ...state.shapes[shapeIndex],
            customProperties: {
              ...state.shapes[shapeIndex].customProperties,
              ...action.payload,
            },
            ...updatedProperties,
          };
        }
      });
    },
    changeToolBarProperties: (state, action) => {
      const attrs = action.payload;

      if (!attrs || attrs.length === 0) {
        state.toolBarProperties = null;
        return;
      }

      let allProperties: ToolBarProperties;

      attrs.forEach((shapeProperties: Shape) => {
        if (!shapeProperties.customProperties) return;

        for (const prop in shapeProperties[
          "customProperties"
        ] as ToolBarProperties) {
          const customProps = shapeProperties["customProperties"];
          if (!allProperties) {
            allProperties = { ...customProps };
            continue;
          }

          if (allProperties[prop]) {
            allProperties[prop] =
              allProperties[prop] === customProps[prop]
                ? customProps[prop]
                : "NOT_SAME_PROPERTIES";
          } else {
            allProperties[prop] = customProps[prop];
          }
        }
      });

      state.toolBarProperties = allProperties;
    },
    addShapes: (state, action) => {
      const shapes: Shape[] | Shape = action.payload;

      if (shapes) {
        if (Array.isArray(shapes)) {
          state.shapes = shapes;
        } else {
          state.shapes.push(shapes);
        }
      }
      // Database call to save the change in the shape
    },
    updateShapes: (state, action) => {
      const { coordinates, shapeId } = action.payload;

      const shapeIndex = state.shapes?.findIndex(
        (s) => s.id === shapeId,
      ) as number;

      state.shapes?.splice(shapeIndex, 1, {
        ...state.shapes[shapeIndex],
        ...coordinates,
      });
    },
    deleteShapes: (state, action) => {
      state.shapes = action.payload;
    },
    handleSelectedIds: (state, action) => {
      state.selectedShapesId = action.payload;
    },
  },
});

export const {
  changeCurrentToolBar,
  changeToolBarPropertiesValue,
  changeToolBarProperties,
  addShapes,
  updateShapes,
  deleteShapes,
  handleSelectedIds,
} = appSlice.actions;
export default appSlice.reducer;
