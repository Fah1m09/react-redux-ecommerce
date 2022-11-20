import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProduct } from "./ProductListSlice";

export const ProductListView = () => {
  const products = useAppSelector((state) => state.prod);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  return (
    <div>
      <h2>List of Users</h2>
      {products.product.length ? (
        <ul>
          {products.product.map((x) => (
            <li key={x.id}>{x.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
