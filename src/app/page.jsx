import axios from "axios";
import Banner from "./Components/Banner";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
import ProductsCollection from "./Components/ProductsCollections/ProductsCollection";
import YouTubePlayer from "./Components/YoutubePlayer/YoutubePlayer";
import BannerWithSlider from "./Components/featured/BannerWithSlider";
import PanjabiBannerWithSlider from "./Components/featured/PanjabiBannerWithSlider";
import ShirtBannerWithSlider from "./Components/featured/ShirtBannerWithSlider";
import Panjabi from "./Components/Collections/Panjabi";
import Shirt from "./Components/Collections/Shirts";
import BaggyPants from "./Components/Collections/BaggyPants";
import FlashSale from "./Components/FlashSale/FlashSale";
import PopupBanner from "./Components/PopUpBanner";
import PopupWrapper from "./Components/PopupWrapper";
export default async function Home() {
  return (
    <div>
      <PopupWrapper /> {/* handles Sale + Free Delivery popups */}
      <main>
        <Banner />
        <ProductsCollection />
        <FlashSale />
        <NewArrivals />
        <BaggyPants />
        <Shirt />
        <Panjabi />
      </main>
    </div>
  );
}
