import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

const AutoHideLoader = () => {
  const { hideLoader } = useLoading();
  const location = useLocation();

  useEffect(() => {
    hideLoader(); // Auto reset on route change
  }, [location]);

  return null;
};

export default AutoHideLoader;
