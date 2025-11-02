import React from "react";
import Form from "./components/Form";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ✅ Background image layer */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/money.jpg')",
        }}
      ></div>

      {/* ✅ Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <Dashboard /> 
      </div>
    </div>
  );
}

export default App;
