/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaDownload, FaClock, FaDatabase, FaFilePdf } from "react-icons/fa";

const BackupDatabase = () => {
  const [loadingJson, setLoadingJson] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [lastBackup, setLastBackup] = useState(null);

  const handleDownload = async (type) => {
    const isPdf = type === "pdf";
    if (isPdf) setLoadingPdf(true);
    else setLoadingJson(true);

    try {
      const response = await fetch(`/api/backup?format=${type}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Backup failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `database_backup.${isPdf ? "pdf" : "json"}`;
      a.click();
      window.URL.revokeObjectURL(url);

      setLastBackup(new Date().toLocaleString());
    } catch (error) {
      alert("Backup failed. Please try again.");
    } finally {
      setLoadingJson(false);
      setLoadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-white p-6 mt-20">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">
        Backup Database
      </h1>

      <div className="bg-[#ffebce] p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
        <FaDatabase className="text-yellow-500 text-6xl mb-4 mx-auto" />
        <p className="text-lg mb-4 text-black">
          Choose a format to download your database backup.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => handleDownload("json")}
            disabled={loadingJson}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg flex items-center justify-center"
          >
            <FaDownload className="mr-2" />
            {loadingJson ? "Backing up JSON..." : "Download as JSON"}
          </button>

          <button
            onClick={() => handleDownload("pdf")}
            disabled={loadingPdf}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center"
          >
            <FaFilePdf className="mr-2" />
            {loadingPdf ? "Backing up PDF..." : "Download as PDF"}
          </button>
        </div>

        {lastBackup && (
          <p className="text-sm mt-4 text-gray-300 flex justify-center items-center">
            <FaClock className="mr-2" />
            Last backup: {lastBackup}
          </p>
        )}
      </div>
    </div>
  );
};

export default BackupDatabase;
