import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [user, userLoading] = useAuthState(auth);

    useEffect(() => {
      // Don't do anything if the user is still loading or not logged in
      if (userLoading || !user?.email) {
        return;
      }

      const checkUserRole = async () => {
        try {
          // API call to check user role
          const { data } = await axios.get(`/api/role?email=${user?.email}`);

          if (data.role === "admin" || data.role === "moderator") {
            setIsAuthorized(true);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/login");
        } finally {
          setLoading(false);
        }
      };

      checkUserRole();
    }, [router, user, userLoading]); // Dependency array includes user and userLoading

    // Show loading spinner if the user is still loading or the role is still being checked
    if (loading || userLoading) {
      return (
        <div className="flex justify-center items-center h-[100vh] w-full">
          <CircularProgress className="text-black" />
        </div>
      );
    }

    // If authorized, render the wrapped component; otherwise, render nothing
    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
