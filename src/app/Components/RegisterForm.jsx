"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { getIdToken } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignOut,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth"; // To set the username
import CircularProgress from "@mui/material/CircularProgress"; // Material UI loading spinner
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [eye, setEye] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);

  const handleShowPass = () => setEye(!eye);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password) {
      toast.error("All fields are required.");

      return;
    }
    if (password && password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return; // Ensure it stops execution
    }

    setFormError("");

    try {
      const result = await createUserWithEmailAndPassword(email, password);

      if (!result || !result.user) {
        throw new Error("User creation failed. Please try again.");
      }

      await updateProfile(result.user, { displayName: name });
      await storeUserInDB({ name, email, phoneNumber });
      toast.success("Registration successful. Please log in.");
      router.push("/login");
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        const googleEmail = result.user.email;
        const googleName = result.user.displayName || "Google User";
        const token = await getIdToken(result.user);
        localStorage.setItem("firebase_token", token);
        // Store user data in DB without password
        await storeUserInDB({ name: googleName, email: googleEmail });
        toast.success("Login successful.");
        router.push("/");
      }
    } catch (err) {
      setFormError(err.message || "Google login failed.");
    }
  };

  const storeUserInDB = async (userData) => {
    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok)
        throw new Error("Failed to store user data in the database.");
    } catch (err) {
      console.error("Error storing user data:", err);
      setFormError("Failed to store user data.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60%] p-8 bg-gray-100">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#000000] bg-white w-full sm:max-w-lg">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            value={name}
          />
          <input
            className="border p-2 rounded"
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
          />
          <input
            className="border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
          <div className="relative">
            <input
              className="border p-2 w-full rounded"
              onChange={(e) => setPassword(e.target.value)}
              type={eye ? "text" : "password"}
              placeholder="Password"
              value={password}
            />
            {eye ? (
              <FaEyeSlash
                onClick={handleShowPass}
                className="cursor-pointer absolute top-3 right-3"
              />
            ) : (
              <FaEye
                onClick={handleShowPass}
                className="cursor-pointer absolute top-3 right-3"
              />
            )}
          </div>
          <button
            className="bg-[#000000] text-white font-bold cursor-pointer px-6 py-2 flex justify-center items-center rounded"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Register"
            )}
          </button>
          <div className="flex flex-col items-center justify-center text-center">
            <p>Or</p>
            <p className="font-bold">Register with</p>
          </div>
          <button
            className="border border-black text-black font-bold px-6 py-2 flex justify-center items-center rounded"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <>
                <FcGoogle className="text-2xl" /> Google
              </>
            )}
          </button>
          {formError && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {formError}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href={"/login"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
