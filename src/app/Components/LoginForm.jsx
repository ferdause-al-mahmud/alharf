"use client";
import { useState, Suspense } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useRouter, useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";

  const handleShowPass = () => setEye(!eye);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result?.user) {
        const token = await getIdToken(result.user);
        localStorage.setItem("firebase_token", token);
        router.push(returnUrl);
        toast.success("Login successful");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result?.user) {
        const token = await getIdToken(result.user);
        const googleEmail = result.user.email;

        localStorage.setItem("firebase_token", token);

        // Check and store user in DB
        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: googleEmail,
            name: result.user.displayName || "Google User",
            password: null,
            phoneNumber: null,
          }),
        });

        if (response.ok || response.status === 409) {
          // Either user is created or already exists
          router.push(returnUrl);
          toast.success("Google login successful");
        }
      }
    } catch (err) {
      toast.error("Google login failed: " + err.message);
    }
  };

  return (
    <div className="grid place-items-center h-screen p-8 sm:p-0 sm:w-[40%] mx-auto">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#000000] w-full">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
          <input
            className="border p-2"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
          <div className="relative">
            <input
              className="border w-full p-2"
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#1d2027" },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
          </Button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error.message}
            </div>
          )}
          <div className="flex flex-col items-center justify-center text-center">
            <p>Or</p>
            <p className="font-bold">Login with</p>
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            sx={{
              color: "#000000",
              borderColor: "#000000",
              "&:hover": { borderColor: "#1d2027", color: "#1d2027" },
            }}
          >
            {googleLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <>
                <FcGoogle className="text-2xl" />
              </>
            )}
          </Button>
          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="grid place-items-center h-screen">
          <CircularProgress />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
