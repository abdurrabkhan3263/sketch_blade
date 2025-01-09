import React from 'react'

interface ColorContainerProps {
    color: string
}

const ColorContainer:React.FC<ColorContainerProps> = ({color}) => {
    return (
        <div className={"h-6 w-6 rounded-md"} style={{backgroundColor:color}} />
    )
}
export default ColorContainer
