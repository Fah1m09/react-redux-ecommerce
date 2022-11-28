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
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProductList } from "../../../services/dummyJson.service";

export const ProductListView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const productsList = useAppSelector((state) => state.prodList.productList);

  return (
    <>
      <Grid container spacing={2}>
        {productsList.map((x) => (
          <Grid item xs={4} key={x.id}>
            <Card>
              <Link className="equipment-title" to={`/products/${x.id}`}>
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
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
