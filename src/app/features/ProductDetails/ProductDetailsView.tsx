import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProductDetails } from "../../../services/dummyJson.service";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProductDetailsView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.prod.product);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // share
  // button for buying multiple quantity
  // compare
  // popup image slider

  useEffect(() => {
    dispatch(getProductDetails(parseInt(params["productId"])));
  }, []);
  return (
    <>
      {products && (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <img
              src={products.thumbnail}
              alt="product-main-image"
              width="100%"
              height="100%"
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <h1>{products.title}</h1>
            <Rating
              name="read-only"
              value={parseInt(products.rating)}
              precision={0.5}
              readOnly
            />
            <div>
              <p>
                <span>Categories: </span>
                <Chip label={products.category} />
              </p>
            </div>
            <div>
              <p>
                <span>Brand: </span>
                <Chip label={products.brand} variant="outlined" />
              </p>
            </div>
            <p>Instock: ({products.stock})</p>
            <h5>{products.price}$</h5>
            <h5 className="product-discount-percentage">
              {products.discountPercentage}%
            </h5>
            <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
              Add to Card
            </Button>
          </Grid>
          <Grid item xs={12} lg={4}>
            {products.images.map((x) => (
              <img src={x} alt="product-main-image" width="25%" height="100%" />
            ))}
          </Grid>
          <Grid xs={12}>
            <Box sx={{ borderTop: "20px", borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Review" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <p>{products.description}</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <p>Review</p>
            </TabPanel>
          </Grid>
        </Grid>
      )}
    </>
  );
};
