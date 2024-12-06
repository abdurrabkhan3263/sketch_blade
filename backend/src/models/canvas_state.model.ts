import { model, Schema, Document } from "mongoose";

export interface ICanvasState extends Document {
  stroke_color: string;
  stroke_width: number;
  fill_color: string;
  edge_style: string;
  zoom: number;
  model: "Dark" | "Light";
  belongs_to: Schema.Types.ObjectId;
}
