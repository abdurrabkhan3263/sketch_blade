import React from "react";

export declare type User = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
};

export declare type Files = {
  _id: string;
  file_name: string;
  folder?: Folder;
  active_collaborators: CreatorDetails[];
  creator: CreatorDetails;
  collaborators: CollaboratorData[];
  description: string;
  createdAt: string;
  updatedAt?: string;
};

export declare type File = {
  _id: string;
  file_name: string;
  folder?: string;
  description?: string;
  locked: boolean;
  active_collaborators: ActiveCollaborators[];
  collaborators: CollaboratorData[];
  creator: CreatorDetails;
  updatedAt: string;
};

export declare type Folder = {
  _id: string;
  folder_name: string;
  createdAt: string;
};

export declare type Folders = {
  _id: string;
  folder_name: string;
  creator: CreatorDetails;
  createdAt: string;
  updatedAt: string;
};

export declare type CreatorDetails = {
  _id?: string;
  full_name: string;
  profile_url: string;
};

export declare type ActiveCollaborators = {
  full_name: string;
  profile_url: string;
  email: string;
};

export declare type CollaboratorData = {
  _id: string;
  full_name: string;
  profile_url: string;
  actions: CollaboratorActions;
  email: string;
};

export declare type ListCollaborator = {
  _id: string;
  email: string;
  full_name: string;
  profile_url: string;
};

export declare type CreateFile = {
  file_name: string;
  collaborators: CollaboratorData[];
  description: string;
};

export declare type UseShapeProperties = {
  type: ToolBarElem;
  fill: string;
  fillStyle: FillStyle;
  stroke: string;
  strokeWidth: number;
  dash: number[];
  lineCap: string;
  draggable: boolean;
  cornerRadius?: number;
  opacity: number;
  customProperties: ToolBarProperties;
};

export declare type ToolBarProperties = {
  fill: string;
  fillStyle: FillStyle;
  stroke: string;
  strokeStyle: StrokeStyle;
  strokeWidth: StrokeWidth;
  edgeStyle: EdgeStyle;
  opacity: number;
  eraserRadius: number;
  fontSize: FontSize;
};

export declare type Coordinates = {
  x: number;
  y: number;
};

export declare type FourCoordinates = {
  x: number;
  y: number;
  x2: number;
  y2: number;
};

export declare type CollaboratorActions = "edit" | "view";

export declare type StrokeStyle = "SOLID" | "DOTTED" | "DASHED";

export declare type FillStyle = "SOLID" | "CROSSHATCH" | "HACHURE";

export declare type EdgeStyle = "SHARP" | "ROUNDED";

export declare type StrokeWidth = "THIN" | "MEDIUM" | "THICK";

export declare type FontSize = "SMALL" | "MEDIUM" | "LARGE";

export declare type ToolBarElem =
  | "hand"
  | "cursor"
  | "circle"
  | "rectangle"
  | "free hand"
  | "text"
  | "eraser"
  | "arrow"
  | "point arrow"
  | "upload";

export declare enum ShapesElements {
  FreeHand = "free hand",
  Rectangle = "rectangle",
  Circle = "circle",
  Text = "text",
  Arrow = "arrow",
  PointArrow = "point arrow",
  Upload = "upload",
}

/*
  The following types are for the CanvaElements.tsx file
 */

export declare type Rectangle = {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: string;
  stroke: string;
  cornerRadius: number;
  draggable: boolean;
  type: ShapesElements;
  strokeWidth: number;
  text?: string;
  fillPatternImage?: string;
  customProperties: ToolBarProperties;
  dash: number[];
  lineCap: EdgeStyle;
  isAddable?: boolean;
};

export declare type Circle = {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: string;
  text?: string;
  fillPatternImage?: string;
  stroke: string;
  draggable: boolean;
  strokeWidth: number;
  type: ShapesElements;
  customProperties: ToolBarProperties;
  lineCap: EdgeStyle;
  dash: number[];
  isAddable?: boolean;
};

export declare type FreeHand = {
  id: string;
  x: number;
  y: number;
  dash: number[];
  stroke: string;
  points: number[];
  strokeWidth: number;
  type: ShapesElements;
  isAddable?: boolean;
  draggable: boolean;
};

export declare type Text = {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  stroke: string;
  opacity: number;
  fontSize: FontSize;
  isAddable?: boolean;
  draggable: boolean;
};

export declare type Shape = Rectangle | Circle | FreeHand;

// FUNCTIONS ARGS TYPES
