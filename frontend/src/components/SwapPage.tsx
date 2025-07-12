import React from "react";
import axios from "axios";

const SwapPage = ({ onNavigate }: { onNavigate: (page: string, item?: any) => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
      <h1 className="text-3xl font-bold mb-4">Swap Page</h1>
      <p className="mb-8 text-gray-600">This is where users can swap items or points.</p>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
        onClick={() => onNavigate("dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SwapPage;