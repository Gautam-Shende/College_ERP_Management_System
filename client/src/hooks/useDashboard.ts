import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboard";

function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await getDashboard();
      setDashboard(response.data);

      setError("");
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
}

export default useDashboard;
