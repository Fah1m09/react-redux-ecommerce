import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import {
  getCategories,
  getProductList,
  searchProductList,
} from "../../../services/dummyJson.service";
import { sessionGetData } from "../../../utils/helpers/session";

export const ProductListView = () => {
  const dispatch = useAppDispatch();
  const [currentCategory, setCurrentCategory] = useState("");
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    if (sessionGetData("ProductList") == null) {
      dispatch(getProductList());
    }
    if (sessionGetData("Categories") == null) {
      dispatch(getCategories());
    }
  }, []);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (currentCategory === "") {
      return productsList;
    }
    return productsList.filter((item) => item.category === currentCategory);
  }

  const productsList =
    sessionGetData("ProductList") != null
      ? sessionGetData("ProductList")
      : useAppSelector((state) => state.prodList.productList);
  const categories =
    sessionGetData("Categories") != null
      ? sessionGetData("Categories")
      : useAppSelector((state) => state.prodList.categories);

  var filteredList = useMemo(getFilteredList, [currentCategory, productsList]);

  const handleSearch = () => {
    dispatch(searchProductList());
  };

  return (
    <>
      <Grid container spacing={2}>
        {categories && (
          <>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Categories</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={currentCategory}
                  label="Categories"
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem value={cat} key={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                id="search"
                label="Search"
                name="search"
                type="text"
                variant="outlined"
                onAbort={(e) => handleSearch()}
                onChange={(event) => {
                  setsearchText(event.target.value);
                }}
                fullWidth
              />
            </Grid>
            {filteredList.length > 0 ? (
              filteredList.map((x) => (
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
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                        >
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
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  paddingLeft: "30%",
                  paddingTop: "20%",
                  minHeight: "80vh",
                }}
              >
                <h3>Sorry No products available</h3>
              </div>
            )}
          </>
        )}
      </Grid>
    </>
  );
};
