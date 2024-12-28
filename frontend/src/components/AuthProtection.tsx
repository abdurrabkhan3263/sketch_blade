import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/authSlice";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthProtection({ children }: AuthLayoutProps) {
  const { session, isLoaded, isSignedIn } = useSession();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded && (!session || !isSignedIn)) {
      navigate("/sign-in");
    } else {
      const sessionData = {
        _id: session?.user.publicMetadata.user_id,
        clerkId: session?.user.id,
        name: session?.user.fullName,
        email: session?.user.primaryEmailAddress?.emailAddress,
      };
      dispatch(addUser(sessionData));
    }
  }, [isLoaded, session, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Redirecting...</div>;
  }

  return <div>{children}</div>;
}
