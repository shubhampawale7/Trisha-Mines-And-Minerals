// import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const TrackVisit = () => {
//   const location = useLocation();
//   const startTimeRef = useRef(Date.now());
//   const previousPathRef = useRef(location.pathname);

//   useEffect(() => {
//     const currentPath = location.pathname;

//     // Skip tracking if user is on the analytics page
//     if (currentPath.includes("/admin/analytics")) return;

//     const isReturning = localStorage.getItem("isReturningUser") === "true";
//     localStorage.setItem("isReturningUser", "true");

//     const sendVisitData = async () => {
//       const endTime = Date.now();
//       const timeSpent = Math.floor((endTime - startTimeRef.current) / 1000); // seconds

//       try {
//         await axios.post("http://localhost:5000/api/analytics/track", {
//           page: previousPathRef.current,
//           timeSpent,
//           isReturning,
//         });
//       } catch (err) {
//         console.error("Analytics tracking failed:", err);
//       }
//     };

//     // When path changes, send analytics for previous page
//     if (previousPathRef.current !== currentPath) {
//       sendVisitData();
//       startTimeRef.current = Date.now();
//       previousPathRef.current = currentPath;
//     }

//     // Track visit on page unload
//     const handleUnload = () => sendVisitData();
//     window.addEventListener("beforeunload", handleUnload);

//     return () => {
//       sendVisitData();
//       window.removeEventListener("beforeunload", handleUnload);
//     };
//   }, [location]);

//   return null;
// };

// export default TrackVisit;
