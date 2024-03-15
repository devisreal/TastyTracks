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
    // Check localStorage for "isAuthenticated" and set a default value if not found
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("isAuthenticated");
      return storedAuth === null ? false : JSON.parse(storedAuth); // Parse stored value (if present)
    }
    return false; // Default to false for server-side rendering or non-browser environments
  });

  const router = useRouter();

  // Login function
  const login = async (values, resetForm, setSubmitting) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/login/", values);
      const response = res.data;

      if (res.status === 200) {
        const user = {
          email: response.email,
          username: response.username,
          full_name: response.full_name,
          user_type: response.user_type,
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
      const res = await api.post("/auth/logout/", {
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
      router.push("/auth/login");
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
        "http://localhost:8000/auth/create-customer/",
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
        "http://localhost:8000/auth/create-restaurant/",
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
      const res = await axios.post("http://localhost:8000/auth/verify-email/", {
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
        "http://localhost:8000/auth/password-reset/",
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
      const res = await api.patch("/auth/set-new-password/", data);
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

  const addMenuItem = async (values, setSubmitting, resetForm) => {
    try {
      const data = new FormData();

      // Loop through the values object and append each key-value pair to the FormData
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          if (key.startsWith("image")) {
            // If the key starts with "image", it's a file input, so append the file
            data.append(key, values[key]);
          } else {
            // Otherwise, append the value as a regular field
            data.append(key, values[key]);
          }
        }
      }

      const res = await api.post("/menu/menu-items/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        resetForm({ values: "" });
        router.push("/restaurant/menu/");
        toast.success("Menu Item Added Successfully");
      }
    } catch (error) {
      console.error("Add Menu Item Error:", error);
      // Handle add menu item error (e.g., display error message)
      toast.error("Failed to add menu item");
    } finally {
      setSubmitting(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(null);

  const deleteCartItem = async (cartItemId) => {
    try {
      setIsDeleting(true);
      const response = await api.post(`/orders/cart/delete-item/`, {
        cart_item_id: cartItemId,
      });
      if (response.status === 200) {
        // Item successfully deleted
        setIsDeleting(false);
        window.location.reload();
        toast.success("Item deleted from cart");
      }
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting item from cart:", error);
      toast.error("Failed to delete item from cart");
      // Handle error (e.g., display error message)
    }
  };

  const increaseCartQuantity = async (cartItemId) => {
    try {
      await api.patch(`/orders/cart/item/${cartItemId}/increase/`);
      window.location.reload();
      // Update cart items in frontend state
      // Example: Update cart items stored in state after increasing quantity
    } catch (error) {
      console.error("Error increasing quantity:", error);
      // Handle error (e.g., display error message)
    }
  };

  const decreaseCartQuantity = async (cartItemId) => {
    try {
      await api.patch(`/orders/cart/item/${cartItemId}/decrease/`);
      window.location.reload();
      // Update cart items in frontend state
      // Example: Update cart items stored in state after decreasing quantity
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      // Handle error (e.g., display error message)
    }
  };

  const addToCart = async (menuItemId, quantity) => {
    try {
      const response = await api.post(`/orders/cart/add-item/`, {
        menu_item_id: menuItemId,
        quantity: quantity,
      });
      if (response.status === 201) {
        toast.success("Item added to cart");
      } else {
        // Handle error responses
        console.error("Error adding item to cart:", error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const [customerDetail, setCustomerDetail] = useState({});

  const fetchCustomerDetail = async () => {
    try {
      const response = await api.get("/auth/customer/detail/");

      if (response.status === 200) {
        setCustomerDetail(response.data);
      } else {
        console.error("Error fetching customer detail", error);
      }
    } catch (error) {
      console.error("Error fetching customer detail:", error.message);
      return null;
    }
  };

  const [restaurantDetail, setRestaurantDetail] = useState({});

  const fetchRestaurantDetail = async () => {
    try {
      const response = await api.get("/auth/owner/detail/");

      if (response.status === 200) {
        setRestaurantDetail(response.data);
      } else {
        console.error("Error fetching restaurant detail", error);
      }
    } catch (error) {
      console.error("Error fetching restaurant detail:", error.message);
      return null;
    }
  };

  const updateCustomerDetails = async (values, setSubmitting, resetForm) => {
    try {
      const data = new FormData();
      const userData = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
      };
      
      data.append("user", JSON.stringify(userData));

      data.append("address", values.address);
      data.append("state", values.state);
      data.append("post_code", values.post_code);
      data.append("phone_number", values.phone_number);
      data.append("city", values.city);

      if (values.avatar instanceof File) {
        // New file upload - append the file to FormData
        // data.append("avatar", values.avatar);
        console.log("Appending file:", values.avatar); // Check file object
        data.append("avatar", values.avatar);
      } 
      // else if (
      //   values.avatar &&
      //   typeof values.avatar === "string" &&
      //   values.avatar.startsWith("http")
      // ) {
      //   data.append("avatar_url", values.avatar);
      // } else {
      //   console.log("no update");
      // }

      console.log(data);

      const res = await api.patch("/auth/customer/detail/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        resetForm({ values: "" });
        console.log(data)
        fetchCustomerDetail();
        toast.success("Customer Details Updated Successfully");
      }
    } catch (error) {
      console.error("Update Customer Details Error:", error);
      // Handle error (e.g., display error message)
      // toast.error("Failed to update customer details");
      window.location.reload()
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
        addMenuItem,
        deleteCartItem,
        isDeleting,
        increaseCartQuantity,
        decreaseCartQuantity,
        addToCart,
        customerDetail,
        fetchCustomerDetail,
        updateCustomerDetails,
        restaurantDetail,
        fetchRestaurantDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
