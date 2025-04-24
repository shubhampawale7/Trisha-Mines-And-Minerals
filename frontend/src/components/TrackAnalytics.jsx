// import { useEffect } from "react";

// const TrackAnalytics = () => {
//   useEffect(() => {
//     const start = Date.now();

//     const trackVisit = async () => {
//       const end = Date.now();
//       const timeSpent = Math.floor((end - start) / 1000); // in seconds

//       const isReturningUser = localStorage.getItem("visitedBefore") === "true";
//       if (!isReturningUser) {
//         localStorage.setItem("visitedBefore", "true");
//       }

//       try {
//         await fetch("http://localhost:5000/api/analytics/track", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             page: window.location.pathname,
//             timeSpent,
//             isReturningUser,
//           }),
//         });
//       } catch (error) {
//         console.error("Failed to send analytics", error);
//       }
//     };

//     window.addEventListener("beforeunload", trackVisit);
//     return () => window.removeEventListener("beforeunload", trackVisit);
//   }, []);

//   return null;
// };

// export default TrackAnalytics;
