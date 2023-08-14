import React, { useState, useEffect } from 'react'
import { db } from "../firebase-config"
import { collection, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore"
import '../App.css';
import EditPopup from './EditPopup';

function ProductList() {

    const [products, setProduct] = useState([]);
    const collectioName = "products";
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const openEditPopup = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };
    const updateProduct = async (id, newPrice) => {
        const productDoc = doc(db, collectioName, id);
        await updateDoc(productDoc, { price: newPrice });
        await getProducts();
    };

    const deleteProduct = async (id) => {
        const productDoc = doc(db, collectioName, id);
        await deleteDoc(productDoc)
    };
    const closeEditPopup = () => {
        setIsPopupOpen(false);
        setSelectedProduct(null);
    };
    const getProducts = async () => {
        const data = await getDocs(collection(db, collectioName));
        setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useEffect(() => {
        getProducts();
    }, [])



    return (
        <div>
            <div className='container-inner'>
                {products.map((product) => (
                    <div key={product.id} className="list-group">
                        <div className="list-group-item d-flex justify-content-between align-items-start mt-2">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{product.name}</div>
                                Type: {product.type}
                            </div>
                            <div className='dividerBlock'>
                                <div className="input-group mt-1">
                                    <span className="input-group-text">{product.price} $</span>
                                    <button className="btn btn-md btn-success" onClick={() => openEditPopup(product)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-md btn-success" onClick={() => deleteProduct(product.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isPopupOpen && (
                    <EditPopup
                        product={selectedProduct}
                        onClose={closeEditPopup}
                        onSave={updateProduct}
                    />
                )}
            </div>
        </div>
    );

}
export default ProductList