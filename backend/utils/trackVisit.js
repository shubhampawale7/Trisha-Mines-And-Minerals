export const trackVisit = async (page) => {
  try {
    await fetch("http://localhost:5000/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });
  } catch (err) {
    console.error("Visit tracking failed");
  }
};
