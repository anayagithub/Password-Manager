import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faCopy,
  faPenToSquare,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordInputRef = useRef();
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setpasswordArray(JSON.parse(password));
    }
  }, []);

  const [form, setform] = useState({ site: "", username: "", password: "" });


  const savePassword = () => {
    setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
    setform(({ site: "", username: "", password: "" }));
  };

  const deletePassword = (id) => {
    console.log("delete",id)
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    
  };

  const editPassword = (id) => {
    console.log("edit",id)
    setform(passwordArray.filter(i=>i.id==id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id));

  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
    if (passwordInputRef.current) {
      passwordInputRef.current.type = isPasswordVisible ? "password" : "text";
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full">
      <div className="absolute top-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(144,238,144,0.3),rgba(255,255,255,0))]"></div>
<div className="h-full ">
      <div className="mycontainer h-full w-full">
        <h1 className="text-4xl font-extrapy-2 bold text-center">
          <span className="text-green-700">&lt;</span>
          Passi
          <span className="text-green-700">FY/&gt; </span>
        </h1>
        <p className="text-green-900 texpy-2 t-lg text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4  text-py-2 back text-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border  border-green-600 p-4 py-1 w-full"
            placeholder="Enter website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className=" flex w-full justify-between my-5 gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="flex w-full rounded-full border border-green-600 p-4 py-1"
              placeholder="Enter Username"
              name="username"
              type="text"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordInputRef}
                value={form.password}
                onChange={handleChange}
                className="flex rounded-full w-full border border-green-600 p-4 py-1"
                placeholder="Enter Password"
                name="password"
                type="password"
                id="password"
              />
              <span
                className=" absolute right-0 top-0 cursor-pointer"
                onClick={showPassword}
              >
                <FontAwesomeIcon
                  className="p-2"
                  width={30}
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-cpy-2 eter text-center gap-2 bg-green-400 px-8 py-2 rounded-full w-fit hover:bg-green-200 border-2 border-green-800"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Password
          </button>
        </div>

        <div className="Password">
          <h2 className="font-bold text-2xl">Your Password</h2>
          {passwordArray.length === 0 && <div>No password to show </div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto  w-full rounded-md overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 w-32 text-center">
                        <div className="flex justify-center items-center">
                          <span> {item.site}</span>
                          <FontAwesomeIcon
                            className="size-5 cursor-pointer ml-2"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            icon={faCopy}
                          />{" "}
                        </div>
                      </td>
                      <td className="py-2 w-32 text-center">
                        {item.username}
                        <FontAwesomeIcon
                          className="size-5 cursor-pointer ml-2"
                          onClick={() => {
                            copyText(item.username);
                          }}
                          icon={faCopy}
                        />{" "}
                      </td>
                      <td className="py-2 w-32 text-center">
                        {item.password}
                        <FontAwesomeIcon
                          className="size-5 cursor-pointer ml-2"
                          onClick={() => {
                            copyText(item.password);
                          }}
                          icon={faCopy}
                        />{" "}
                      </td>
                      <td className="py-2 w-32 text-center">
                       <span>
                        <FontAwesomeIcon
                          className="size-5 cursor-pointer ml-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                          icon={faPenToSquare}
                        />{" "}
                        </span>
                        <span>
                        <FontAwesomeIcon
                          className="size-5 cursor-pointer ml-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                          icon={faTrash}
                        />{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Manager;
