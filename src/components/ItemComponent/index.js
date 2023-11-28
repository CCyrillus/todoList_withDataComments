import { useState, useEffect } from 'react';

import "./index.css";
const ItemComponent = () => {
    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState((() => {
        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : [];
    }));
    const [selectedItemId, setSelectedItemId] = useState(() => {
        const storedSelectedItemId = localStorage.getItem('selectedItemId');
        return storedSelectedItemId ? parseInt(storedSelectedItemId, 10) : null;
    });
    const [newComment, setNewComment] = useState("");
    const [colour, setColour] = useState("#000000");

    function addItem() {
        if (newItem.trim() === "") {
            return;
        }
        const item = {
            id: Math.floor(Math.random() * 100000000),
            value: newItem,
            array: [],
        };

        setItems(oldList => [...oldList, item]);
        setNewItem("");

        if (items.length < 1) {
            setSelectedItemId(item.id);
        }
    }
    function deleteItem(id) {
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray)
        if (id === selectedItemId) {
            setSelectedItemId(null);
        }

        if (items.length > 0) {
            setSelectedItemId(items[0].id);
        }
        console.log(items[0].id)
    }
    function addComment(id) {
        if (newComment.trim() === "") {
            return;
        }
        const updatedItems = items.map((item) =>
            item.id === id
                ? {
                    ...item,
                    array: [...item.array, { text: newComment, color: colour }],
                }
                : item
        );
        setItems(updatedItems);
    }

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('selectedItemId', selectedItemId);

        if (items.length === 1) {
            setSelectedItemId(items[0].id);
        }
        setNewComment("");
        setColour("#000000");
        
        if (items.length < 1) {
            setSelectedItemId(null);
        }

    }, [items, selectedItemId]);

    return (
        <div className="content">
            <div className="content_box">
                <div className="column">

                    <h2 className="column_title">Items</h2>

                    <input
                        className='column_input'
                        type="text"
                        value={newItem}
                        placeholder='Type name here...'
                        onChange={e => setNewItem(e.target.value)}
                        required
                    />
                    <button
                        className="btn btn-new"
                        onClick={() => addItem()}
                    >Add New</button>

                    <ul className="listItems">
                        {items.map(item => {
                            return (
                                <li key={item.id}
                                    className={`listItems_elem ${item.id === selectedItemId ? 'selected' : ''}`}
                                    onClick={() => setSelectedItemId(item.id)}
                                >
                                    {item.value}
                                    <span className="badge">{item.array.length}</span>
                                    <button className="btn btn-delete"
                                        onClick={() => deleteItem(item.id)}
                                    >Delete</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="column">
                    <h2 className="column_title">Comments #{selectedItemId}</h2>
                    <div >
                        {items
                            .filter((item) => item.id === selectedItemId)
                            .map((item) =>
                                item.array.map((comment, index) => (
                                    <div className="list_comments">
                                        <div className='list_comments-color' style={{ backgroundColor: comment.color }}>
                                        </div>
                                        <div className='list_comments-body' key={index} >
                                            {comment.text}
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                    <div>
                        <div className="box_comments">
                            <input
                                className="box_comments-input"
                                type="color"
                                defaultValue={"#000000"}
                                value={colour}
                                id="head"
                                name="head"
                                onChange={e => setColour(e.target.value)}

                            />
                            <textarea
                                className='box_comments-textArea'
                                type="text"
                                spellCheck="true"
                                placeholder='Type comment here...'
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                required
                            />
                            <button className="btn box_comments-btn" onClick={() => addComment(selectedItemId)}>Add New</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ItemComponent;