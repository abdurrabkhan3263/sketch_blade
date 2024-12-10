import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthProtection({ children }: AuthLayoutProps) {
  const { session, isLoaded } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !session) {
      navigate("/sign-in");
    }
    console.log(session)
  }, [isLoaded, session, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Redirecting...</div>;
  }

  return <div>{children}</div>;
}
