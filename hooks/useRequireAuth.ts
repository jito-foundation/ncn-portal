// hooks/useRequireAuth.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/context/AuthContext";

export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
};
