import React from 'react';
import './App.css';
import CreateForm from './components/CreateForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className='App'>
      <div className='container-inner'>
        <CreateForm />
        <ProductList />
      </div>
    </div >
  );
}
export default App