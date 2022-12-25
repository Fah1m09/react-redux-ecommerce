import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function Cart(props) {
  const { openCart, setOpenCart } = props;

  const handleClose = () => {
    setOpenCart(false);
  };

  return (
    <>
      <Dialog
        open={openCart}
        onClose={handleClose}
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        <DialogTitle id="cart-title">Cart</DialogTitle>
        <DialogContent>
          <DialogContentText id="cart-details">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Cart;
