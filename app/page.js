"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SportyIndia = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null; // Or an optional loading indicator
};

export default SportyIndia;
