import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import close from "./../../assets/icon-cross.svg";
import "./Item.css";
import { useState } from "react";

function Item({ id, input, click, closeButton, completed }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        handle: '.drag-handle',
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [grab, setGrab] = useState(false);

    return (
        <div ref={setNodeRef} style={style} className="item">
            <div className="drag-handle">
                <div className="checkButton">
                    <input type="checkbox" id={`checkbox-${id}`} checked={completed} onChange={click} />
                    <p {...attributes} {...listeners} style={grab ? { cursor: "grabbing" } : {}} onMouseDown={() => { setGrab(true) }} onMouseUp={() => { setGrab(false) }} className={completed ? "complete" : ""}>
                        {input}
                    </p>
                </div>
            </div>

            <img src={close} onClick={closeButton} alt="close" className="close-button" />
        </div>
    );
}

export default Item;
