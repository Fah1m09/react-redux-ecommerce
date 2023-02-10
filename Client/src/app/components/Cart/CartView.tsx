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

  const handleCheckout = () => {
    let items = carts.map((row) => {
      return { id: row.productId, quantity: row.quantity };
    });
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        items,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  const net = carts.reduce((accumulator, object) => {
    return accumulator + object.total;
  }, 0);

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
          <h5>Total: {net}</h5>
          <Button color="primary" variant="contained" onClick={handleCheckout}>
            Checkout
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Cart;
