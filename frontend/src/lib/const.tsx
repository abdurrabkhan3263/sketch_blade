import {GrCursor} from "react-icons/gr";
import {GoArrowDown, GoCircle} from "react-icons/go";
import {PiRectangle} from "react-icons/pi";
import {FaEraser, FaPencilAlt} from "react-icons/fa";
import {RiText} from "react-icons/ri";
import {BsArrow90DegDown} from "react-icons/bs";

const ToolBarElem = [
    {
        name:"Cursor",
        icon:<GrCursor />,
    },
    {
        name:"Circle",
        icon:<GoCircle />
    },
    {
        name:"Rectangle",
        icon:<PiRectangle />
    },
    {
        name:"Free Draw",
        icon:<FaPencilAlt />
    },
    {
        name:"Text",
        icon:<RiText />
    },
    {
        name:"Eraser",
        icon:<FaEraser />
    },
    {
        name:"Arrow",
        icon:<GoArrowDown />
    },
    {
        name:"Point Arrow",
        icon:<BsArrow90DegDown />
    }
]

export {ToolBarElem}
