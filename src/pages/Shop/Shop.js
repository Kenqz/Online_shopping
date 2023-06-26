import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ItemList from './ItemList/ItemList';

import { productsActions } from '../../store/productsSlice';
import Loader from '../../components/Loader/Loader';

const Shop = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      const res = await fetch(
        'https://webshop-bc01e-default-rtdb.firebaseio.com/store.json'
      );
      const data = await res.json();
      dispatch(productsActions.addItems(data));
      setIsLoading(false);
    };
    fetching();
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ItemList items={items.hats.slice(0, 4)} category="Hats" />
          <ItemList items={items.sneakers.slice(0, 4)} category="Sneakers" />
          <ItemList items={items.jackets.slice(0, 4)} category="Jackets" />
          <ItemList items={items.mens.slice(0, 4)} category="Mens" />
          <ItemList items={items.womens.slice(0, 4)} category="Womens" />
        </>
      )}
    </div>
  );
};

export default Shop;
