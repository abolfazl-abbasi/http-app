import React from "react";
import Discussion from "../Container/Discussion/Discussion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        pauseOnHover={false}
        theme="colored"
        draggable
      />
      <Discussion />
    </>
  );
};

export default App;
