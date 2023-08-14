import { useState } from 'react';
import React from "react";
import '../App.css'
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase-config"

function CreateForm() {
    const productsCollection = collection(db, "products");
    const initialFormData = {
        newName: "",
        newType: "",
        newPrice: 0,
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const createProduct = async () => {
        if (formData.newName.trim() === "" || formData.newType.trim() === "" || isNaN(formData.newPrice) || formData.newPrice <= 0) {
            alert("Please ensure your data is correct");
            return;
        }
        await addDoc(productsCollection, { name: formData.newName, type: formData.newType, price: Number(formData.newPrice) });
        setFormData(initialFormData);
        alert("New product added!!")

    };
    return (
        <div className="row g-2">
            <div className="col-md">
                <div className="form-floating">
                    <input onChange={handleChange} value={formData.newName} name="newName" type="text" className="form-control" id="floatingInputGrid"></input>
                    <label htmlFor="floatingInputGrid">Name</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                    <input onChange={handleChange} value={formData.newType} name="newType" type="text" className="form-control" id="floatingInputGrid" ></input>
                    <label htmlFor="floatingInputGrid">Type</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                    <input onChange={handleChange} value={formData.newPrice} name="newPrice" type="number" className="form-control" id="floatingInputGrid" ></input>
                    <label htmlFor="floatingInputGrid">Price</label>
                </div>
            </div>
            <button onClick={createProduct} type="button" className="btn btn-lg btn-success">Add to list</button>

        </div>
    );
}
export default CreateForm;