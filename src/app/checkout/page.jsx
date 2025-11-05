"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../CartProvider/CartProvider";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const CheckoutPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { cart, loading, clearCart } = useCart();
  const [shippingOption, setShippingOption] = useState("insideDhaka");
  const [paymentOption, setpaymentOption] = useState("cash");
  const [shippingCost, setShippingCost] = useState(70);
  const [discount, setDiscount] = useState(0);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Check if all items in cart are shoes

  // Check if total quantity is 3 or more
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const priceToUse = item.offerPrice ? item.offerPrice : item.price;
    return total + priceToUse * item.quantity;
  }, 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Refs for each input field
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);

  const handleShippingChange = (event) => {
    const selectedOption = event.target.value;
    setShippingOption(selectedOption);

    if (selectedOption === "insideDhaka") {
      setShippingCost(80);
    } else if (selectedOption === "outsideDhaka") {
      setShippingCost(130);
    } else if (selectedOption === "dhakaSubAreas") {
      setShippingCost(100);
    }
  };

  const calculateDiscount = () => {
    const pa01Product = cart.find(
      (item) => item.id === "PA-01" && item.quantity > 1
    );
    if (pa01Product) {
      return 100;
    }
    return 0;
  };

  // Handle coupon code application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);

    try {
      if (couponCode.trim().toUpperCase() === "SILVER10") {
        // Apply 10% discount directly (no first-order check)
        const discountAmount = Math.round(subtotal * 0.1);
        setCouponDiscount(discountAmount);
        setIsCouponApplied(true);
        toast.success(`Coupon applied! You saved ৳${discountAmount}`);
      } else {
        // Invalid code
        toast.error("Invalid coupon code");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      toast.error(
        error.response?.data?.message || "Failed to apply coupon code"
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setIsCouponApplied(false);
    toast.success("Coupon removed");
  };

  // Set shipping cost to 0 if all items are shoes OR if total quantity is 3 or more
  useEffect(() => {
    if (shippingOption === "insideDhaka") {
      setShippingCost(80);
    } else if (shippingOption === "outsideDhaka") {
      setShippingCost(130);
    } else if (shippingOption === "dhakaSubAreas") {
      setShippingCost(100);
    }
  }, [shippingOption]);

  const total = subtotal + shippingCost - discount - couponDiscount;

  const handlePaymentMethod = (event) => {
    const selectedOption = event.target.value;
    setpaymentOption(selectedOption);
  };

  useEffect(() => {
    if (!loading && cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, loading, router]);

  useEffect(() => {
    if (!loading) {
      const discountAmount = calculateDiscount();
      setDiscount(discountAmount);
    }
  }, [cart, loading]);

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_ids: cart.map((item) => item.id),
        content_type: "product",
        value: subtotal,
        currency: "BDT",
      });

      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "initiateCheckout",
          ecommerce: {
            currency: "BDT",
            value: subtotal,
            items: cart.map(({ id, name, quantity, offerPrice, price }) => ({
              item_id: id,
              item_name: name,
              price: offerPrice || price,
              quantity,
            })),
          },
        });
      }
    }
  }, [cart, subtotal]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let firstErrorField = null;

    if (!formData.name) {
      newErrors.name = "Name is required";
      if (!firstErrorField) firstErrorField = nameRef;
    }
    if (formData.email) {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
        newErrors.email = "Valid email is required";
        if (!firstErrorField) firstErrorField = emailRef;
      }
    }
    if (!formData.phone || formData.phone.length < 11) {
      newErrors.phone = "Valid phone number is required";
      if (!firstErrorField) firstErrorField = phoneRef;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      if (!firstErrorField) firstErrorField = addressRef;
    }

    setErrors(newErrors);
    return firstErrorField;
  };

  const handleSubmit = async () => {
    const firstErrorField = validateForm();
    if (!firstErrorField) {
      const cleanedCart = cart.map(
        ({
          _id,
          id,
          name,
          selectedSize,
          quantity,
          offerPrice,
          price,
          imageUrl,
        }) => ({
          _id,
          id,
          name,
          selectedSize,
          quantity,
          price: offerPrice || price,
          imageUrl,
        })
      );

      const orderData = {
        formData,
        cart: cleanedCart,
        paymentOption,
        shippingOption: shippingOption,
        total,
        shippingCost,
        discount,
        couponDiscount,
        couponCode: isCouponApplied ? couponCode : null,
      };

      setIsSubmitting(true);
      try {
        const response = await axios.post("/api/checkout", orderData);

        if (response.status === 201) {
          const orderID = response.data.orderID;

          const quantityUpdates = cleanedCart.map((item) => ({
            productId: item.id,
            size: item.selectedSize,
            quantity: -Number.parseInt(item.quantity, 10),
          }));

          try {
            await axios.post("/api/orders/update-quantity", {
              updates: quantityUpdates,
            });
          } catch (error) {
            console.error("Error updating product quantities:", error);
          }

          toast.success(`Order placed successfully! Order ID: ${orderID}`);

          if (typeof window !== "undefined" && window.dataLayer) {
            const [firstName = "", ...lastParts] = (formData.name || "")
              .trim()
              .split(" ");
            const lastName = lastParts.join(" ");

            window.dataLayer.push({
              event: "purchase",
              ecommerce: {
                transaction_id: orderID,
                value: total,
                currency: "BDT",
                items: cart.map(
                  ({ id, name, quantity, offerPrice, price }) => ({
                    item_id: id,
                    item_name: name,
                    quantity,
                    price: offerPrice || price,
                  })
                ),
              },
              user_data: {
                first_name: firstName,
                last_name: lastName,
                phone: `+88${formData.phone}`,
                address: formData.address,
                country: "BD",
                ...(formData.email && { email: formData.email.toLowerCase() }),
              },
            });
          }

          router.push(`/orders/${orderID}`);

          setTimeout(() => {
            clearCart();
          }, 2000);
        } else {
          toast.error("Failed to place order");
          console.error("Error placing order", response.data);
        }
      } catch (error) {
        toast.error("Error during order submission!");
        console.error("Error during order submission:", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      firstErrorField.current.focus();
    }
  };

  if (loading) {
    return (
      <div className="flex h-[100vh] items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 py-8">
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        {/* Billing Details Section */}
        <Box
          flex={1}
          padding={2}
          border={1}
          borderColor="divider"
          borderRadius={2}
        >
          <Typography variant="h5" gutterBottom>
            Billing Details
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              required
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setErrors((prev) => ({ ...prev, name: "" }))}
              error={!!errors.name}
              helperText={errors.name}
              inputRef={nameRef}
            />

            <TextField
              required
              label="Full Address(পুরো ঠিকানা)"
              placeholder="House number and street name"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              onFocus={() => setErrors((prev) => ({ ...prev, address: "" }))}
              error={!!errors.address}
              helperText={errors.address}
              inputRef={addressRef}
            />
            <TextField
              type="number"
              required
              label="Phone(মোবাইল নাম্বার)"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onFocus={() => setErrors((prev) => ({ ...prev, phone: "" }))}
              error={!!errors.phone}
              helperText={errors.phone}
              inputRef={phoneRef}
            />
            <TextField
              label="Email address (optional)"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setErrors((prev) => ({ ...prev, email: "" }))}
              error={!!errors.email}
              helperText={errors.email}
              inputRef={emailRef}
            />
            <TextField
              label="Order notes (optional)"
              placeholder="Notes about your order, e.g., special notes for delivery."
              fullWidth
              multiline
              rows={4}
              margin="normal"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        {/* order details */}
        <Box
          flex={0.5}
          padding={2}
          border={1}
          borderColor="divider"
          borderRadius={2}
        >
          <Typography variant="h5" gutterBottom>
            Your Order
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              padding: 2,
              backgroundColor: "#f7f7f7",
              color: "black",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography>Product</Typography>
              <Typography>Subtotal</Typography>
            </Box>
            <Divider sx={{ my: 1, backgroundColor: "#666" }} />
            {cart.map((item, idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent="space-between"
                className="gap-4 mb-2"
              >
                <Typography>
                  {item?.name} {item?.selectedSize}{" "}
                  <span className="text-red-500">X</span> {item?.quantity}
                </Typography>
                <Typography>
                  ৳
                  {item?.offerPrice
                    ? item?.offerPrice * item?.quantity
                    : item?.price * item?.quantity}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 1, backgroundColor: "#666" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography>Subtotal</Typography>
              <Typography>৳{subtotal.toFixed(2)}</Typography>
            </Box>

            {discount > 0 && (
              <>
                <Divider sx={{ my: 1, backgroundColor: "#666" }} />
                <Box
                  sx={{ color: "green" }}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography sx={{ color: "green" }}>Discount</Typography>
                  <Typography sx={{ color: "green" }}>
                    -৳{discount.toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}

            {/* Coupon Code Section */}
            <Divider sx={{ my: 2, backgroundColor: "#666" }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Have a coupon code?
              </Typography>
              <Box display="flex" gap={1}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={isCouponApplied}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                    },
                  }}
                />
                {!isCouponApplied ? (
                  <Button
                    variant="contained"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon || !couponCode.trim()}
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      minWidth: "100px",
                      ":hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    {isApplyingCoupon ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleRemoveCoupon}
                    sx={{
                      color: "red",
                      borderColor: "red",
                      minWidth: "100px",
                      ":hover": {
                        borderColor: "darkred",
                        bgcolor: "#ffebee",
                      },
                    }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
              {isCouponApplied && (
                <Box
                  sx={{
                    mt: 1,
                    p: 1,
                    bgcolor: "#e8f5e8",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <span>✓</span>
                  <Typography variant="body2" sx={{ color: "#2e7d32" }}>
                    Coupon "<strong>{couponCode}</strong>" applied successfully!
                  </Typography>
                </Box>
              )}
            </Box>

            {couponDiscount > 0 && (
              <>
                <Divider sx={{ my: 1, backgroundColor: "#666" }} />
                <Box
                  sx={{ color: "green" }}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography sx={{ color: "green" }}>
                    Coupon Discount
                  </Typography>
                  <Typography sx={{ color: "green" }}>
                    -৳{couponDiscount.toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}

            {/* Shipping Section */}
            <Divider sx={{ my: 1, backgroundColor: "#666" }} />
            <RadioGroup value={shippingOption} onChange={handleShippingChange}>
              <Box display="flex" justifyContent="space-between">
                <FormControlLabel
                  value="insideDhaka"
                  control={<Radio />}
                  label="Inside Dhaka"
                />
                <Typography> (৳80.00)</Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  value="dhakaSubAreas"
                  control={<Radio />}
                  label={
                    <Box>
                      Dhaka Sub Areas (Tongi, Gazipur, Savar, Keraniganj,
                      Narayanganj, Kaliganj)
                    </Box>
                  }
                />
                <Typography>(৳100.00)</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <FormControlLabel
                  value="outsideDhaka"
                  control={<Radio />}
                  label="Outside Dhaka"
                />
                <Typography> (৳130.00)</Typography>
              </Box>
            </RadioGroup>

            <Divider sx={{ my: 1, backgroundColor: "#666" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography>Shipping</Typography>
              <Typography>৳{shippingCost.toFixed(2)}</Typography>
            </Box>

            <Divider sx={{ my: 1, backgroundColor: "#666" }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">৳{total.toFixed(2)}</Typography>
            </Box>

            <RadioGroup defaultValue="cash" onChange={handlePaymentMethod}>
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on delivery"
              />
            </RadioGroup>

            <Button
              variant="contained"
              fullWidth
              className="w-full mt-2"
              sx={{
                bgcolor: "black",
                color: "white",
                border: "1px solid black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Place Order"
              )}
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
};

export default CheckoutPage;
