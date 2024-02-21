"use client";
import { createContext, useContext, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
        };

        // Store user data and tokens in local storage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access", response.tokens.access);
        localStorage.setItem("refresh", response.tokens.refresh);

        // Update state and navigate to profile page
        setUser(user);
        setSubmitting(false);
        router.push("/users/profile");
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
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        router.push("/auth/login");
        toast.success("Logged out successfully!");
      }
    } catch (error) {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
