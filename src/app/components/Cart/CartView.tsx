import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useAppSelector } from "../../../hooks/useReduxHooks";

function Cart(props) {
  const { openCart, setOpenCart } = props;
  const carts = useAppSelector((state) => state.cart.cart);

  const handleClose = () => {
    setOpenCart(false);
  };

  return (
    <>
      <Dialog
        open={openCart}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        <DialogTitle id="cart-title">Cart</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="cart-details">
            {carts &&
              carts.map((x, index) => (
                <Grid key={index} container spacing={1}>
                  <Grid item xs={4}>
                    {
                      <img
                        key={index}
                        src={x.thumbnail}
                        alt="product-main-image"
                        width="50px"
                        height="50px"
                      />
                    }
                  </Grid>
                  <Grid item xs={4}>
                    {x.title}
                  </Grid>
                  <Grid item xs={1}>
                    {x.quantity}
                  </Grid>
                  <Grid item xs={1}>
                    {x.price}
                  </Grid>
                  <Grid item xs={2}>
                    {x.total}
                  </Grid>
                </Grid>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Cart;
