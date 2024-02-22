"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

export default function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/auth/login"); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return null; // Return null if not authenticated to prevent flickering
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
