import React from 'react'

interface ContainerProps {
    children: React.ReactNode
    label: string
}

const Container:React.FC<ContainerProps> = ({children,label}) => {
    return (
        <div className={"flex flex-col gap-y-1.5"}>
            <span>
                <p className={"text-sm font-medium"}>
                    {label}
                </p>
            </span>
            <div className={'flex flex-wrap gap-2'}>
                {children}
            </div>
        </div>
    )
}
export default Container
