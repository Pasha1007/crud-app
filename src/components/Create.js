// import React, { useState, useEffect } from 'react'
// import { db } from "../firebase-config"
// import { collection, getDocs } from "firebase/firestore"


// function Create() {
//     const [products, setProduct] = useState([]);
//     const productsCollection = collection(db, "products");

//     useEffect(() => {
//         const getProducts = async () => {
//             const data = await getDocs(productsCollection);
//             setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//         };
//         getProducts();
//     }, [productsCollection])
//     return (
//         <div>
//             {products.map((products) => {
//                 return <div>
//                     <ol className="list-group">
//                         <li className="list-group-item d-flex justify-content-between align-items-start">
//                             <div className="ms-2 me-auto">
//                                 <div className="fw-bold">{products.name}</div>
//                                 {products.type}
//                             </div>
//                             <span className="badge bg-primary rounded-pill">{products.price}</span>
//                         </li>
//                     </ol>
//                 </div>
//             })}
//         </div>
//     );
// }
// export default Create