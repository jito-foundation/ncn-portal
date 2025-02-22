import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
