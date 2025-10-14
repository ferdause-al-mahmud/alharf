// profile page component (e.g., /components/User/UserProfile.js or /pages/profile.js)
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import UserOrderTable from "../Components/User/UserOrderTable";
import privateRoute from "../lib/PrivateRoute";

const UserProfile = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signOut, error] = useSignOut(auth);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        localStorage.removeItem("firebase_token");
        toast.success("User logged out successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `/api/orders/customer/${user.email}`
          );
          setOrders(response.data.orders);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error("Failed to load orders.");
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (loading || loadingOrders) {
    return (
      <div className="flex justify-center items-center h-[60vh] w-full">
        <CircularProgress className="text-black" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 h-auto w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl sm:text-3xl">Account Details</h1>
        <p className="text-[16px]">Welcome, {user?.displayName || "User"}!</p>

        {/* <Link href="/addresses">
                    <button className="text-white bg-black hover:bg-white hover:text-black border px-4 py-2 rounded transition w-full sm:w-auto">
                        View Addresses
                    </button>
                </Link> */}

        <p
          onClick={handleLogout}
          className="text-black font-semibold cursor-pointer border-b-2 border-black inline-block hover:border-b-4 max-w-max"
        >
          Log Out
        </p>

        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl">Order History</h2>
          <UserOrderTable orders={orders} /> {/* Pass orders data */}
        </div>
      </div>
    </div>
  );
};

export default privateRoute(UserProfile);
