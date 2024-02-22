'use client'
import api from "@/utils/api";
import withAuth from "@/components/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@mantine/core";

const ISSERVER = typeof window === "undefined";

const ProfilePage = () => {  
  const user = !ISSERVER ? JSON.parse(localStorage.getItem("user")) : "";
  const jwt_access = !ISSERVER ? localStorage.getItem("access") : "";
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
      // Handle logout error (e.g., display error message)
    }
  };

  return (
    <div className="mx-auto max-w-lg py-12 md:max-w-screen-lg">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          User Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user && user.full_name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user && user.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user && user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>

          <div className="mt-6 flex  justify-end">
            <Button onClick={handleLogout} color="dark" variant="light">
              Logout
            </Button>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
