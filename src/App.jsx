import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <div className="overflow-x-hidden h-screen w-full ">
      <Navbar />
      <div className="h-[100%] mb-20 w-full">  <Manager /></div>
     
      <Footer />
      </div>
    </>
  );
}

export default App;
