"use client";
import { createContext, useContext, useState } from "react";
import api from "@/utils/api";
import { useRouter, notFound } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export default AuthContext;

const ISSERVER = typeof window === "undefined";
let access_token;
let refresh_token;
if (typeof window !== "undefined") {
  access_token = localStorage.getItem("access") || null;
  refresh_token = localStorage.getItem("refresh") || null;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user")) || null;
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("isAuthenticated");
      return authData !== null ? authData : false;
    }
    return false; 
  });
  const router = useRouter();
  

  // Login function
  const login = async (values, resetForm, setSubmitting) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login/", values);
      const response = res.data;

      if (res.status === 200) {
        const user = {
          email: response.email,
          username: response.username,
          full_name: response.full_name,
          user_type: response.user_type,
          initials: response.initials,
        };

        // Store user data and tokens in local storage
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access", response.tokens.access);
        localStorage.setItem("refresh", response.tokens.refresh);
        localStorage.setItem("isAuthenticated", true);

        // Update state and navigate to profile page
        setSubmitting(false);

        if (user.user_type === "customer") {
          router.push("/user/profile");
        } else if (user.user_type === "restaurant") {
          router.push("/restaurant/dashboard");
        } else if (user.user_type === "admin") {
          router.push("/admin");
        } else {
          notFound();
        }

        toast.success("Login Successful");
      }
    } catch (error) {
      // Handle login error (e.g., display error message)
      toast.error(error.response.data.error);
    } finally {
      // Reset form after submission
      resetForm({ values: "" });
    }
  };

  // Logout
  const logout = async () => {
    try {
      const res = await api.post("/logout/", {
        refresh_token: localStorage.getItem("refresh"),
      });
      if (res.status === 200) {
        setIsAuthenticated(false);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        localStorage.setItem("isAuthenticated", false);
        router.push("/auth/login");
        toast.success("Logged out successfully!");
      }
    } catch (error) {
      toast.error("An error occured");
      setIsAuthenticated(false);
      console.error("Logout Error:", error);
      // Handle logout error (e.g., display error message)
    }
  };

  //   Customer Sign Up
  const signupCustomer = async (values, resetForm, setSubmitting) => {
    try {
      const { first_name, last_name, email, password, password2 } = values;
      const res = await axios.post(
        "http://localhost:8000/api/create-customer/",
        {
          user: {
            first_name,
            last_name,
            email,
            password,
            password2,
          },
        },
      );
      const response = res.data;
      if (res.status === 201) {
        setSubmitting(false);
        router.push("/auth/verify-email/");
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Customer Signup Error:", error);
      // Handle signup error (e.g., display error message)
      toast.error("Signup Failed");
    } finally {
      resetForm({ values: "" });
    }
  };

  // Restaurant Sign Up
  const signupRestaurant = async (values, resetForm, setSubmitting) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        password2,
        store_name,
        brand_name,
        description,
        phone_number,
        website,
        address_line1,
        address_line2,
        postcode,
        city,
      } = values;
      const res = await axios.post(
        "http://localhost:8000/api/create-restaurant/",
        {
          user: {
            first_name,
            last_name,
            email,
            password,
            password2,
          },
          store_name,
          brand_name,
          description,
          phone_number,
          website,
          address_line1,
          address_line2,
          postcode,
          city,
        },
      );
      const response = res.data;
      if (res.status === 201) {
        setSubmitting(false);
        router.push("/auth/verify-email/");
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Restaurant Signup Error:", error);
      // Handle signup error (e.g., display error message)
      toast.error("Signup Failed");
    } finally {
      resetForm({ values: "" });
    }
  };

  //   Verify Email
  const verifyEmail = async (otp, setIsSubmitting) => {
    try {
      const res = await axios.post("http://localhost:8000/api/verify-email/", {
        otp: otp,
      });
      if (res.status === 200) {
        router.push("/auth/login");
        toast.success(res.data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Email Verification Error:", error);
      // Handle verification error (e.g., display error message)
      toast.error("Email Verification Failed");
    }
  };

  //   Forget password
  const forgetPassword = async (email, setSubmitting, resetForm) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/password-reset/",
        {
          email: email,
        },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setSubmitting(false);
        resetForm({ values: "" });
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Forget Password Error:", error);
      // Handle forget password error (e.g., display error message)
      toast.error("Password Reset Failed");
    }
  };

  //   Reset Password
  const resetPassword = async (data, setSubmitting, resetForm) => {
    try {
      const res = await api.patch("/set-new-password/", data);
      if (res.status === 200) {
        resetForm({ values: "" });
        router.push("/auth/login/");
        toast.success(res.data.message, { duration: 6000 });
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      // Handle reset password error (e.g., display error message)
      toast.error("Password Reset Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signupCustomer,
        signupRestaurant,
        verifyEmail,
        forgetPassword,
        resetPassword,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
