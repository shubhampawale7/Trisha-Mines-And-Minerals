import { useEffect } from "react";
import axios from "axios";

const AnalyticsTracker = () => {
  useEffect(() => {
    axios
      .post("/api/analytics/track", {
        type: "visit",
        page: window.location.pathname,
        timestamp: new Date(),
      })
      .catch((err) => {
        console.error("Analytics error:", err);
      });
  }, []);

  return null;
};

export default AnalyticsTracker;
