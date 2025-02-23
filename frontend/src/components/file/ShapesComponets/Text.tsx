import React from "react";
import { Text } from "react-konva";

interface CustomTextProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  text: string;
  draggable: boolean;
  opacity: number;
}

const CustomText: React.FC<CustomTextProps> = ({ ...props }) => {
  return <Text {...props} />;
};

export default CustomText;
