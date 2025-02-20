import { ToolBarElem } from "../../lib/const.tsx";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import {
  changeCurrentToolBar,
  handleSelectedIds,
} from "../../redux/slices/appSlice.ts";
import Konva from "konva";

interface ToolBarProps {
  transformerRef: React.RefObject<Konva.Transformer>;
}

const ToolBar: React.FC<ToolBarProps> = ({ transformerRef }) => {
  const selectedTooBar = useSelector(
    (state: RootState) => state.app.currentToolBar,
  );
  const dispatch = useDispatch();

  const handleToolBarClick = (toolBar: string) => {
    if (transformerRef?.current && transformerRef.current.nodes().length > 0) {
      transformerRef.current.nodes([]);
      dispatch(handleSelectedIds([]));
    }
    dispatch(changeCurrentToolBar(toolBar));
  };

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
              "relative flex items-center justify-center gap-1.5 rounded-md bg-secondary p-2 text-quaternary transition-all hover:bg-teal-950/30"
            }
            onClick={() => handleToolBarClick(elem.name)}
          >
            <span className={"relative z-10"}>{elem.icon}</span>
            <AnimatePresence mode={"wait"}>
              {selectedTooBar === elem.name && (
                <motion.span
                  initial={false}
                  className={cn(
                    "absolute right-0 top-0 z-0 size-full rounded-md bg-teal-950/80",
                  )}
                  layoutId={"active"}
                ></motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ToolBar;
