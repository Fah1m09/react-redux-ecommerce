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
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProduct } from "./ProductListSlice";

export const ProductListView = () => {
  const products = useAppSelector((state) => state.prod);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  return (
    <>
      {products.product.length ? (
        <Grid container spacing={2}>
          {products.product.map((x) => (
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={x.thumbnail}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {x.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {x.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </>
  );
};
