import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
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
            <Card className="product-card">
              <Link className="equipment-title" to={`/products/${x.id}`}>
                <CardMedia
                  component="img"
                  height="300"
                  image={x.thumbnail}
                  alt="thumbnail"
                />
                <CardContent>
                  <Typography
                    className="product-title"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {x.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {x.description}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={parseInt(x.rating)}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    {x.price}$
                  </Button>
                  <p className="product-discount-percentage">
                    {x.discountPercentage}%
                  </p>
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
