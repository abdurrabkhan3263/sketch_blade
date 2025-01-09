import React from 'react'
import Container from "./Container.tsx";
import ToolBarActions from "./const.ts";
import ColorContainer from "./ColorContainer.tsx";

const Background = () => {
    return (
        <Container label={"Background"}>
            {
                ToolBarActions.backgroundColors.map((color, index) => (
                    <ColorContainer color={color} key={index} />
                ))
            }
        </Container>
    )
}
export default Background
