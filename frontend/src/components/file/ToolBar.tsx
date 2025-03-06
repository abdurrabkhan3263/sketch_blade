import { ToolBarElem } from "../../lib/const.tsx";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { changeCurrentToolBar } from "../../redux/slices/appSlice.ts";
import Konva from "konva";
import { useEffect } from "react";
import { ToolBarElem as ToolBarTypes } from "../../lib/types/index.ts";

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
    }

    dispatch(
      changeCurrentToolBar({
        toolBar: toolBar as ToolBarTypes,
        isClicked: true,
      }),
    );
  };

  useEffect(() => {
    const clickNumericalBtn = (e: globalThis.KeyboardEvent) => {
      if (!e.code.startsWith("Digit") && !e.code.startsWith("Numpad")) return;

      const num = Number(e.key);

      if (num <= 0 || !transformerRef.current) return;

      const toolBar = ToolBarElem[num - 1].name;

      if (toolBar === selectedTooBar) return;

      dispatch(
        changeCurrentToolBar({
          toolBar: toolBar as ToolBarTypes,
          isClicked: true,
        }),
      );
      transformerRef.current?.nodes([]);
    };

    document.addEventListener("keypress", clickNumericalBtn);

    return () => {
      document.removeEventListener("keypress", clickNumericalBtn);
    };
  }, [dispatch, selectedTooBar, transformerRef]);

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
            data-index={index + 1}
            className={
              "bg-teal-500/ relative flex items-center justify-center gap-1.5 rounded-md p-2 text-quaternary transition-all before:absolute before:bottom-0 before:right-1 before:z-50 before:flex before:items-center before:justify-center before:text-[10px] before:content-[attr(data-index)] hover:bg-teal-950/30"
            }
            onClick={() => handleToolBarClick(elem.name)}
          >
            <span className={"relative z-10 text-lg"}>{elem.icon}</span>
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
