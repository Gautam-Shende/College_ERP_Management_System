import { useEffect, useState, useCallback } from "react";
import { getDashboard } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboard";

function useDashboard(enabled = true) {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    if (!enabled) return;
    try {
      setLoading(true);
      const response = await getDashboard();
      if (response && response.data) {
        setDashboard(response.data);
        setError("");
      } else {
        setError("Failed to fetch dashboard data");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to load dashboard";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      fetchDashboard();
    } else {
      setLoading(false);
    }
  }, [enabled, fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
}

export default useDashboard;
