import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../api/authApi";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    verifyEmail(token)
      .then(() => {
        setStatus("Email verified successfully!");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch(() => {
        setStatus("Invalid or expired verification link.");
      });
  }, [searchParams, navigate]);

  return <h1>{status}</h1>;
}