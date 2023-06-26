import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useHttp from '../../hooks/use-http';
import ItemList from '../Shop/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';

const Category = () => {
  const [data, setData] = useState([]);
  const { sendRequest, isLoading } = useHttp();
  const { type } = useParams();

  useEffect(() => {
    sendRequest(
      {
        url: `https://webshop-bc01e-default-rtdb.firebaseio.com/store/${type}.json`,
      },
      getData
    );
  }, [sendRequest, type]);

  const getData = (data) => {
    setData([...data]);
  };

  return (
    <>
      <ItemList
        items={data}
        category={type}
        categoryItemList="categoryItemList__inner"
      />
      {isLoading && <Loader />}
    </>
  );
};
export default Category;
