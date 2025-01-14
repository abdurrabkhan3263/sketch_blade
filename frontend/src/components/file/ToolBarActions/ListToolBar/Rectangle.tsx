import React from 'react'
import Container from "../Container.tsx";
import {Background, Fill, Opacity, Stroke, StrokeStyle, StrokeWidth,EdgeStyle} from "./ToolBarElements.tsx";

const Rectangle = () => {
    return (
        <Container>
            <Background />
            <Stroke />
            <Fill />
            <StrokeStyle />
            <StrokeWidth />
            <EdgeStyle />
            <Opacity />
        </Container>
    )
}
export default Rectangle
