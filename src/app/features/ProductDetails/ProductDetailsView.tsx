import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Rating,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../hooks/useReduxHooks";
import { getProductDetails } from "../../../services/dummyJson.service";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIosTwoToneIcon from "@mui/icons-material/ArrowBackIosTwoTone";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import { addToCart } from "../../components/Cart/CartSlice";
import { iCart } from "../../../types/Cart";
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
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [numberOfProd, setNumberOfProd] = useState(1);
  const [currImage, setCurrImage] = useState(0);
  const carts = useAppSelector((state) => state.cart.cart);
  const [temp, setTemp] = useState([]);

  const changeImage = () => {
    if (currImage < products.images.length - 1) {
      setCurrImage(currImage + 1);
    } else {
      setCurrImage(0);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuantity = (e) => {
    const minValue = 1;
    const maxValue = Number(products.stock);
    setNumberOfProd(Math.min(Math.max(e.target.value, minValue), maxValue));
  };

  const handleCart = () => {
    const reqQs: iCart = {
      productId: products.id,
      title: products.title,
      price: parseInt(products.price),
      total: numberOfProd * parseFloat(products.price),
      thumbnail: products.thumbnail,
      quantity: numberOfProd,
    };

    dispatch(addToCart(reqQs));
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
              onClick={handleClickOpen}
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
              <span>Categories: </span>
              <Chip label={products.category} />
            </div>
            <div>
              <span>Brand: </span>
              <Chip label={products.brand} variant="outlined" />
            </div>
            Instock: ({products.stock})
            <div className="flex">
              <h5>{products.price}$</h5>
              <h5 className="product-discount-percentage">
                save ({products.discountPercentage})%
              </h5>
            </div>
            <TextField
              sx={{ width: "80px", marginRight: "1rem" }}
              inputProps={{ min: 1, max: parseInt(products.stock) }}
              type="number"
              size="small"
              id="outlined-basic"
              variant="outlined"
              onClick={(e) => handleQuantity(e)}
              defaultValue={numberOfProd}
            />
            <Button
              onClick={handleCart}
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid className="details-image-list" item xs={12} lg={4}>
            {products.images.map((x, index) => (
              <img
                key={index}
                src={x}
                alt="product-main-image"
                onClick={handleClickOpen}
                width="25%"
                height="50%"
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderTop: "20px", borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Review" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              {products.description}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Review
            </TabPanel>
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <div className="product-image-display">
                <IconButton onClick={changeImage}>
                  <ArrowBackIosTwoToneIcon />
                </IconButton>

                <img
                  src={products.images[currImage]}
                  alt="product-main-image"
                  width="80%"
                  height="100%"
                />

                <IconButton onClick={changeImage}>
                  <ArrowForwardIosTwoToneIcon />
                </IconButton>
              </div>
            </DialogContent>
          </Dialog>
        </Grid>
      )}
    </>
  );
};
