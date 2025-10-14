"use client";
import React, { useState, useEffect } from "react";
import SalePopUpBanner from "./SalePopUpBanner";
import PopupBanner from "./PopUpBanner";

const PopupWrapper = () => {
  const [showSale, setShowSale] = useState(false);
  const [showFree, setShowFree] = useState(false);

  useEffect(() => {
    const hasSeenSale = sessionStorage.getItem("classyTouchSaleBannerSeen");

    if (!hasSeenSale) {
      setShowSale(true);
    } else {
      setShowFree(true);
    }
  }, []);

  const handleSaleClose = () => {
    sessionStorage.setItem("classyTouchSaleBannerSeen", "true");
    setShowSale(false);
    setShowFree(true); // show free delivery popup next
  };

  return (
    <>
      {showSale && <SalePopUpBanner onClose={handleSaleClose} />}
      {showFree && <PopupBanner />}
    </>
  );
};

export default PopupWrapper;
