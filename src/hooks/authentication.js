import { useEffect, useState } from "react";
import { clearLocalStorage, isTokenValid } from "../util/auth";

export default function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [validToken, setValidToken] = useState(isTokenValid());

  useEffect(() => {
    const interval = setInterval(() => {
      const isValid = isTokenValid();
      setValidToken(isValid);
      setToken(localStorage.getItem("token") || "");

      if (!isValid) {
        clearLocalStorage();
      }
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return [token, validToken];
}
