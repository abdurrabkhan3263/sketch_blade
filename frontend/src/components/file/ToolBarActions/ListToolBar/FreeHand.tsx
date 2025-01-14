import React from 'react'
import Container from "../Container.tsx";
import {Opacity, Stroke, StrokeStyle, StrokeWidth} from "./ToolBarElements.tsx";


const FreeHand = () => {
    return (
        <Container>
            <Stroke />
            <StrokeStyle />
            <StrokeWidth />
            <Opacity />
        </Container>
    )
}
export default FreeHand
