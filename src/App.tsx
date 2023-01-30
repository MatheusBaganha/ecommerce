import React from 'react';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import { commerce } from './lib/commerce';
import { Product } from '@chec/commerce.js/types/product';
import { ProductTypes } from './types/types';

function App() {
  const [products, setProducts] = React.useState<ProductTypes[]>([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    console.log(data);
    setProducts(data as ProductTypes[]);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Products products={products} />
    </>
  );
}

export default App;
