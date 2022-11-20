import { Grid } from "@mui/material";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { ProductListView } from "../features/ProductList/ProductListView";

export default function HomePage() {
  return (
    <>
      <Grid className="container">
        <ProductListView />
      </Grid>
    </>
  );
}
