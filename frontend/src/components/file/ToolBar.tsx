import React from 'react'
import {ToolBarElem} from "../../lib/const.tsx";


const ToolBar = () => {
    return (
      <div
        className={
          "h-12 rounded-md border border-tertiary bg-secondary p-1.5 shadow shadow-white/10"
        }
      >
        <div className={"flex size-full flex-nowrap gap-2"}>
          {ToolBarElem.map((elem, index) => (
            <div
              key={index}
              className={
                "flex items-center gap-1.5 bg-gray-800 p-2 rounded-md bg-secondary text-quaternary"
              }
            >
                    {elem.icon}
            </div>
          ))}
        </div>
      </div>
    );
}
export default ToolBar
