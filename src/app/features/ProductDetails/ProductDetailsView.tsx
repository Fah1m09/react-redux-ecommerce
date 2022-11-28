import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProductDetails } from "../../../services/dummyJson.service";

export const ProductDetailsView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.prod.product);

  useEffect(() => {
    dispatch(getProductDetails(parseInt(params["productId"])));
  }, []);
  return (
    <>
      {products && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <img
              src={products.thumbnail}
              alt="product-main-image"
              width="600"
              height="600"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <h1>{products.title}</h1>
            <p>{products.price}</p>
            <p>{products.category}</p>
            <p>{products.brand}</p>
            <p>{products.description}</p>
            <p>{products.rating}</p>
            <p>{products.stock}</p>
          </Grid>
        </Grid>
      )}
    </>
  );
};
