"use client";
import api from "@/utils/api";
import withAuth from "@/components/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@mantine/core";
import Link from 'next/link'

const ISSERVER = typeof window === "undefined";

const ProfilePage = () => {
  const user = !ISSERVER ? JSON.parse(localStorage.getItem("user")) : "";  
  const { logout, isAuthenticated } = useAuth();  

  const getSomeData = async () => {
    const res = await api.get("/test-auth/");
    if (res.status === 200) {
      console.log(res.data);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();      
    } catch (error) {
      console.error("Logout Error:", error);      
    }
  };

  return (
    <div className="mx-auto max-w-lg md:max-w-screen-lg">
      Profile
    </div>
  );
};

export default withAuth(ProfilePage);
