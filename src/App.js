import React, { useState, useEffect } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import './App.css';




function App() {
  const productsCollection = collection(db, "products");
  const [products, setProduct] = useState([]);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);

  const updateProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    const newField = updatedPrice
    await updateDoc(productDoc, { price: newField })
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc)
  };

  const createProduct = async () => {
    await addDoc(productsCollection, { name: newName, type: newType, price: Number(newPrice) });
  };

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(collection(db, "products"));
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, [])

  return (
    <div className='App'>
      <div className='container1'>
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input onChange={(event) => { setNewName(event.target.value); }} type="email" className="form-control" id="floatingInputGrid"></input>
              <label htmlFor="floatingInputGrid">Name</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input onChange={(event) => { setNewType(event.target.value); }} type="email" className="form-control" id="floatingInputGrid" ></input>
              <label htmlFor="floatingInputGrid">Type</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input onChange={(event) => { setNewPrice(event.target.value); }} type="number" className="form-control" id="floatingInputGrid" ></input>
              <label htmlFor="floatingInputGrid">Price</label>
            </div>
          </div>
          <button onClick={createProduct} type="button" className="btn btn-lg btn-success">Add to list</button>

        </div>

        {products.map((products) => {
          return (
            <ol key={products.id} className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-start mt-2">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{products.name}</div>
                  Type: {products.type}
                </div>
                <div className="input-group mt-1" style={{ width: '50%' }}>
                  <span className="input-group-text">{products.price} $</span>
                  <input onChange={(event) => { setUpdatedPrice(Number(event.target.value)); }} type="number" class="form-control" placeholder='Edit price'></input>
                  <button className='editBtn' onClick={() => {
                    updateProduct(products.id);
                  }}>Edit</button>
                  <button className='deleteBtn' onClick={() => {
                    deleteProduct(products.id);
                  }}>Delete</button>
                </div>
              </li>
            </ol>

          );
        })}
      </div>
    </div >
  );
}
export default App