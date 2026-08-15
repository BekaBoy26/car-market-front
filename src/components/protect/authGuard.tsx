"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: IAuthGuardProps) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default AuthGuard;
