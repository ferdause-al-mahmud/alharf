import axios from "axios";
import Banner from "./Components/Banner";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import ProductsCollection from "./Components/ProductsCollections/ProductsCollection";
import FlashSale from "./Components/FlashSale/FlashSale";
import PopupWrapper from "./Components/PopupWrapper";
export default async function Home() {
  return (
    <div>
      {/* <PopupWrapper /> handles Sale + Free Delivery popups */}
      <main>
        <Banner />
        {/* <ProductsCollection /> */}
        {/* <FlashSale /> */}
        <NewArrivals />
      </main>
    </div>
  );
}
