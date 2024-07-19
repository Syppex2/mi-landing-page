import React, { useState, useEffect } from 'react';
import './Other.css';

function Other() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();

    if (isEditing) {
      const updatedProducts = products.map((product, index) =>
        index === currentIndex ? { ...newProduct, date } : product
      );
      setProducts(updatedProducts);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setProducts([...products, { ...newProduct, date }]);
    }

    setNewProduct({ name: '', price: '', description: '' });
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setNewProduct(products[index]);
    setIsEditing(true);
  };

  const handleSelectProduct = (index) => {
    if (selectedProducts.includes(index)) {
      setSelectedProducts(selectedProducts.filter(i => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, index]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedProducts = products.filter((_, index) => !selectedProducts.includes(index));
    setProducts(updatedProducts);
    setSelectedProducts([]);
  };

  return (
    <section className="section">
      <h2>Otra sección</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Nombre del producto"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Precio del producto"
            required
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Descripción del producto"
            required
          ></textarea>
          <button type="submit">{isEditing ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        </form>

        <button onClick={handleDeleteSelected} disabled={selectedProducts.length === 0}>
          Eliminar Seleccionados
        </button>

        <table>
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(index)}
                    onChange={() => handleSelectProduct(index)}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.date}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Editar</button>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Other;
