import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-600 ">
      <div className="mycontainer flex items-center justify-between  py-5 h-16 text-white">
        <div className="logo font-extrabold text-2xl ">
          <span className="text-green-700"> &lt;</span>
          Passi
          <span className="text-green-700">FY/&gt; </span>
        </div>
        {/* <ul>
          <li className="flex gap-4 cursor-pointer">
            <a className="hover:font-bold" href="/">
              {" "}
              Home
            </a>
            <a className="hover:font-bold" href="#">
              {" "}
              About Us
            </a>
            <a className="hover:font-bold" href="#">
              {" "}
              Contact Us
            </a>
          </li>
        </ul> */}
        <button className="text-white border border-b-indigo-100 px-4 p-2 rounded-full bg-green-600">
          Github
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
