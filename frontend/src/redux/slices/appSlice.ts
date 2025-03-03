import { createSlice } from "@reduxjs/toolkit";
import { ToolBarProperties, ToolBarElem, Shape } from "../../lib/types";
import { toolBarProperties } from "../../lib/const.ts";
import { getProperties } from "../../lib/utils.ts";
import {
  createNewShape,
  deleteShape,
  updateShape,
} from "../../lib/action/shape.action.ts";

type SelectedShapesId = {
  purpose: "FOR_EDITING" | "FOR_DELETING";
  id: string[];
};

type StateType = {
  currentToolBar: ToolBarElem;
  toolBarProperties: ToolBarProperties | null;
  shapes: Shape[];
  selectedShapesId: SelectedShapesId | null;
};

const initialState: StateType = {
  currentToolBar: "cursor",
  toolBarProperties: null,
  shapes: [],
  selectedShapesId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeCurrentToolBar: (state, action) => {
      const payload: ToolBarElem = action.payload;
      state.currentToolBar = action.payload;

      if (state.selectedShapesId && state.selectedShapesId.id.length > 0) {
        state.selectedShapesId = null;
        return;
      }

      if (payload === "cursor" || payload === "hand") {
        state.toolBarProperties = null;
      } else {
        state.toolBarProperties = toolBarProperties[payload];
      }
    },
    changeToolBarPropertiesValue: (state, action) => {
      const payload = action.payload;

      if (!payload) return;

      state.toolBarProperties = {
        ...state.toolBarProperties,
        ...payload,
      };

      if (!state.shapes || !state.selectedShapesId?.id.length) return;

      state.selectedShapesId?.id.forEach((id) => {
        const shapeIndex =
          state.shapes.findIndex((shape) => shape.id === id) ?? -1;

        if (shapeIndex !== -1) {
          const propertyKey: keyof ToolBarProperties = Object.keys(
            action.payload,
          )[0] as keyof ToolBarProperties;

          const updatedProperties = getProperties(
            [propertyKey],
            action.payload,
          );

          state.shapes[shapeIndex] = {
            ...state.shapes[shapeIndex],
            customProperties: {
              ...state.shapes[shapeIndex].customProperties,
              ...payload,
            },
            ...updatedProperties,
          };

          // UPDATE INTO THE DATABASE OR LOCALSTORAGE BASED UPON BUSINESS LOGIC.
          updateShape(id, updatedProperties);
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
      const shapes: Shape = action.payload;

      if (shapes) {
        if (Array.isArray(shapes)) {
          state.shapes = shapes;
        } else {
          state.shapes.push(shapes);
          createNewShape(shapes);
        }
      }
    },
    updateShapes: (state, action) => {
      const {
        updatedValue,
        shapeId,
      }: { updatedValue: Partial<Shape>; shapeId: string } = action.payload;

      const shapeIndex = state.shapes?.findIndex(
        (s) => s.id === shapeId,
      ) as number;

      state.shapes?.splice(shapeIndex, 1, {
        ...state.shapes[shapeIndex],
        ...updatedValue,
      });

      updateShape(shapeId, updatedValue);
    },
    deleteShapes: (state) => {
      const selectedShapes = state.selectedShapesId?.id;

      if (!Array.isArray(selectedShapes) || selectedShapes.length <= 0) return;

      const filteredShapes =
        state?.shapes &&
        state.shapes.filter((shape) => !selectedShapes.includes(shape.id));

      deleteShape(state.selectedShapesId?.id as string[]);

      state.shapes = filteredShapes;
      state.selectedShapesId = null;
    },
    handleSelectedIds: (
      state,
      action: { payload: SelectedShapesId | null },
    ) => {
      const { id = "", purpose = "" } = action.payload || {};
      const previousIds = state.selectedShapesId?.id ?? [];

      if (!id || !purpose) {
        state.selectedShapesId = null;
        return;
      }

      if (Array.isArray(id) && Array.length > 0) {
        state.selectedShapesId = {
          purpose,
          id,
        };
        return;
      }

      state.selectedShapesId = {
        purpose,
        id: [...previousIds, id] as string[],
      };
    },
  },
});

export const {
  changeCurrentToolBar,
  changeToolBarPropertiesValue,
  changeToolBarProperties,
  addShapes,
  updateShapes,
  handleSelectedIds,
  deleteShapes,
} = appSlice.actions;
export default appSlice.reducer;
