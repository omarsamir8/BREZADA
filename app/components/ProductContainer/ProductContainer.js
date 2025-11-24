'use client';

import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './ProductContainer.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductContainer(props) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      // خزن أول 8 منتجات فقط
      setProducts(res.data.slice(0, 8));
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => { getProducts(); }, []);

  const addToCart = (item) => {
    let cart = localStorage.getItem("cart");

    if (cart) {
      cart = JSON.parse(cart);
      const exist = cart.find((pro) => pro.id === item.id);

      if (exist) {
        exist.qty += 1;
      } else {
        cart.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([{ ...item, qty: 1 }]));
    }

    toast.success("Added to cart!");
  };

  return (
    <div className="ProductContainer">
      <h2 className='ProductContainertitle'>{props.title}</h2>
      <div className='P-Container'>
        {products.length > 0 ? (
          products.map((pro, index) => (
            <Product
              key={index}
              id={pro._id}
              img={pro.image}
              status="On Sale!"
              olPrice={pro.priceBeforeSale}
              currentPrice={pro.price}
              name={pro.name}
              brand={pro.brand}
              addToCart={addToCart}
              onSelect={(product) => setSelectedProduct(product)}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default ProductContainer;
