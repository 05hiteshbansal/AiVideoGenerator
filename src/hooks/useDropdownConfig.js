import { useEffect, useState } from "react";
import axios from "axios";

export const useDropdownConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("/api/dropdownConfig");
        setConfig(response.data);
      } catch (err) {
        console.error("Error fetching dropdown config:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};
