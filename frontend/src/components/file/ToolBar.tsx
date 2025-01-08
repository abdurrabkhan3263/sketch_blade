import {ToolBarElem} from "../../lib/const.tsx";
import {motion,AnimatePresence} from "motion/react"
import {cn} from "../../lib/utils.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {toggleCurrentToolBar} from "../../redux/slices/appSlice.ts";

const ToolBar = () => {
    const selectedTooBar = useSelector((state:RootState)=>state.app.currentToolBar)
    const dispatch = useDispatch()

    const handleToolBarClick = (toolBar) =>{
        dispatch(toggleCurrentToolBar(toolBar))
    }

    return (
      <div
        className={
          "h-12 rounded-md border border-tertiary bg-secondary p-1.5 shadow shadow-white/10"
        }
      >
        <div className={"tool__bar"}>
          {ToolBarElem.map((elem, index) => (
            <div
              key={index}
              className={
                "relative flex items-center gap-1.5 hover:bg-teal-950/30 transition-all p-2 rounded-md bg-secondary text-quaternary"
              }
              onClick={()=>handleToolBarClick(elem.name)}
            >
                    <span className={"relative z-10"}>
                        {elem.icon}
                    </span>
                <AnimatePresence mode={"wait"}>
                    {
                        selectedTooBar === elem.name && (
                            <motion.span initial={false} className={cn(
                                "size-full absolute z-0 right-0 top-0 rounded-md bg-teal-950/80",
                            )} layoutId={"active"} >
                            </motion.span>
                        )
                    }
                </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    );
}
export default ToolBar
