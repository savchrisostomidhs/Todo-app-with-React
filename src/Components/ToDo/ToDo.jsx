import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import Item from "./../Item";
import "./ToDo.css";

function ToDo() {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
    const [displayList, setDisplayList] = useState([]);
    const [active, setActive] = useState(0);

    // Input text Functions

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        if (e.key === "Enter" && input !== "") {
            setList((prev) => [...prev, { id: Date.now(), name: input, completed: false }]);
            setInput("");
        }
    };

    // Item Functions

    const handleCheckbutton = (id) => {
        setList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
        );
    };

    const handleCloseButton = (id) => {
        setList((prev) => prev.filter((item) => item.id !== id));
    };

    // Drag End Handler

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setList((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // Display List based on filter

    useEffect(() => {
        setDisplayList(
            list.map((item) => (
                <Item key={item.id} id={item.id} input={item.name} click={() => handleCheckbutton(item.id)} closeButton={() => handleCloseButton(item.id)} completed={item.completed} />
            ))
        );
    }, [list]);

    // All Button

    const handleAll = () => {
        setDisplayList(
            list.map((item) => (
                <Item key={item.id} id={item.id} input={item.name} click={() => handleCheckbutton(item.id)} closeButton={() => handleCloseButton(item.id)} completed={item.completed} />
            ))
        );
        setActive(0);
    };

    // Active Button

    const handleActive = () => {
        setDisplayList(
            list.filter((item) => !item.completed).map((item) => (
                <Item key={item.id} id={item.id} input={item.name} click={() => handleCheckbutton(item.id)} closeButton={() => handleCloseButton(item.id)} completed={item.completed} />
            ))
        );
        setActive(1);
    };

    // Complete Button

    const handleComplete = () => {
        setDisplayList(
            list.filter((item) => item.completed).map((item) => (
                <Item key={item.id} id={item.id} input={item.name} click={() => handleCheckbutton(item.id)} closeButton={() => handleCloseButton(item.id)} completed={item.completed} />
            ))
        );
        setActive(2);
    };

    // Clear Button

    const clear = () => {
        setList((prev) => prev.filter((item) => !item.completed));
        setActive(0);
    };

    return (
        <div className="todo">
            <div className="input">
                <input type="radio" />
                <input type="text" onChange={handleInput} onKeyDown={handleSubmit} value={input} placeholder="Create a new todo..." />
            </div>

            <div className="display">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={list.map((item) => item.id)}>
                        <div className="items">{displayList}</div>
                    </SortableContext>
                </DndContext>
                <div className="footer">
                    <p className="items">
                        <span>{list.length}</span> items left
                    </p>

                    <div className="filter">
                        <button onClick={handleAll} className={(active === 0 ? "blue " : "") + "all"}>All</button>
                        <button onClick={handleActive} className={(active === 1 ? "blue " : "") + "active"}>Active</button>
                        <button onClick={handleComplete} className={(active === 2 ? "blue " : "") + "completed"}>Completed</button>
                    </div>

                    <button onClick={clear} className="clear">Clear Completed</button>
                </div>
            </div>
        </div>
    );
}

export default ToDo;
