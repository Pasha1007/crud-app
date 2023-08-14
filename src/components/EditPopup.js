import React, { useState } from 'react';
import '../App.css'
function EditPopup({ product, onClose, onSave }) {
    const [updatedPrice, setUpdatedPrice] = useState(product.price);

    const handleSave = () => {
        onSave(product.id, updatedPrice);
        onClose();
    };

    return (

        <div className="popup">
            <div className="popup-content">
                <span>Edit Price for {product.name}</span>
                <div className="input-group mt-1">
                    <input className="form-control"
                        type="number"
                        value={updatedPrice}
                        onChange={(e) => setUpdatedPrice(e.target.value)}></input>
                    <button className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
                    <button className="btn btn-sm btn-success" onClick={onClose}>Cancel</button>


                </div>
            </div>
        </div>

    );
}

export default EditPopup;
