import { useState, useEffect } from 'react';

import "./index.css";
const ItemComponent = () => {
    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState((() => {

        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : [];
    }));
    
    function addItem() {

        const item = {
            id: Math.floor(Math.random() * 100000000),
            value: newItem
        };

        setItems(oldList => [...oldList, item]);
        setNewItem("");
        console.log(item.id)
    }
    function deleteItem(id) {
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray)
    }
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    return (
        <div className="row_content">
            <div className="box">
                <div className="column content_item">
                    <h2 className="title">Items</h2>

                    <div className="box-input">
                        <input
                            className='input-style crt'
                            type="text"
                            value={newItem}
                            placeholder='Type name here...'
                            onChange={e => setNewItem(e.target.value)}
                        />
                        <button
                            className="btn btn-new"
                            onClick={() => addItem()}
                        >Add New</button>
                    </div>
                    <ul className="listItems">
                        {items.map(item => {
                            return (
                                <li key={item.id} className="listItems_elem">
                                    {item.value}
                                    <span class="badge badge-info badge-pill">0</span>
                                    <button className="btn btn-delete"
                                        onClick={() => deleteItem(item.id)}
                                    >Delete</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="column content_coments">
                    <h2 className="title">Comments #</h2>
                    <div>
                        <div className="box-comments">
                            <input className="form-control" type="color" id="head" name="head" />
                            <textarea
                                className='input-style'
                                type="text"
                                spellCheck="true"
                                placeholder='Type comment here...'

                            />
                            <button className="btn btn-coment">Add New</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ItemComponent;