import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords= async ()=>{
    let req= await fetch("http://localhost:3000/")
    let password = await req.json()
    setpasswordArray(password);
  }

  useEffect(() => {
    getPasswords()
  }, [])

  const showPassword = () => {
    if (ref.current.src.includes("/hide-eye.svg")) {
      ref.current.src = "/Show-icon.svg";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "/hide-eye.svg";
      passwordref.current.type = "password";
    }
  };

  const savePassword = async ()=>{
    if(form.site.length>0 && form.password.length>0 && form.username.length>0){
      if (form.id) {
        await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id: form.id}) });
      }

      const newItem = { ...form, id: uuidv4() }; //form + id add
      const updatedArray = [...passwordArray, newItem]; //add in the passwordArray
      setpasswordArray(updatedArray);

      await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newItem)})

      // localStorage.setItem("passwords", JSON.stringify(updatedArray));
      // console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
    } 
    else{
      toast(" ERROR: Input cannot be null", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } 
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const deletePassword = async (id) => {
    let cnf = confirm("Do u  really want to delete?");
    if (cnf) {
      console.log("password deleted", id);
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id)),
      // );
      
      let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id}) })
      
      toast("🦄 Deleted Succesfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform({...passwordArray.filter((i) => i.id === id)[0], id:id});
    setpasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const copyText = (text) => {
    console.log("text copied1");
    toast("🦄 Succesfully Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log("text copied1");

    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-800">
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient (to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute  left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full    bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:px-0 lg:py-16">
        <h1 className=" text-white text-4xl text font-bold text-center">
          <span className="text-green-600">&lt;</span>
          PManger
          <span className="text-green-600">/&gt;</span>
        </h1>
        <p className="text-green-600 text-lg text-center">
          Your OWN password Manager
        </p>

        <div className="flex flex-col items-center gap-5 p-2 text-white sm:gap-8 sm:p-4">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
            placeholder="Enter WebSite URL"
          />

          <div className="flex w-full flex-col gap-5 sm:flex-row sm:gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
            />

            <div className="relative flex w-full">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
              <div
                onClick={showPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <span className="">
                  <img ref={ref} src="/hide-eye.svg" />
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex items-center gap-1 justify-center bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-500 border border-green-900"
          >
            <img
              className="w-9 h-10  "
              src="/add2-icon.svg"
              alt="addbtn-img trigger:hover"
            />
            Save Password
          </button>
        </div>

        <div className="passwords w-full">
          <h2 className="text-center text-2xl py-2 font-bold text-white">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-500 px-4 py-8 text-center text-slate-300">
              No passwords saved yet
            </div>
          )}
          {passwordArray.length > 0 && (
            <div className="space-y-3">
              <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_5rem] rounded-md bg-green-700 px-4 py-3 text-left text-sm font-semibold text-white sm:grid">
                <span>Site</span>
                <span>Username</span>
                <span>Password</span>
                <span className="text-center">Actions</span>
              </div>
              {passwordArray.map((item) => {
                const fields = [
                  { label: "Site", value: item.site, href: item.site },
                  { label: "Username", value: item.username },
                  { label: "Password", value: item.password },
                ];

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 items-center gap-3 rounded-md border border-slate-200 bg-white p-4 text-slate-900 shadow-sm sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_5rem] sm:gap-4"
                  >
                    {fields.map((field) => (
                      <div
                        key={field.label}
                        className="grid grid-cols-[5rem_minmax(0,1fr)_2rem] items-center gap-2 sm:block"
                      >
                        <span className="text-xs font-semibold uppercase text-slate-500 sm:hidden">
                          {field.label}
                        </span>
                        {field.href ? (
                          <a
                            className="min-w-0 break-all text-green-800 underline decoration-green-300 underline-offset-2 hover:text-green-950"
                            href={field.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {field.value}
                          </a>
                        ) : (
                          <span className="min-w-0 break-all">{field.value}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => copyText(field.value)}
                          className="inline-flex size-8 items-center justify-center rounded hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-green-700 sm:ml-1"
                          title={`Copy ${field.label.toLowerCase()}`}
                          aria-label={`Copy ${field.label.toLowerCase()}`}
                        >
                          <img className="w-5" src="/copy-icon.svg" alt="" />
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-3 sm:justify-center sm:border-0 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => editPassword(item.id)}
                        className="inline-flex size-9 items-center justify-center rounded hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-green-700"
                        title="Edit password"
                        aria-label={`Edit password for ${item.site}`}
                      >
                        <img className="h-5 w-5" src="/edit-icon.svg" alt="" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePassword(item.id)}
                        className="inline-flex size-9 items-center justify-center rounded hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
                        title="Delete password"
                        aria-label={`Delete password for ${item.site}`}
                      >
                        <img className="h-5 w-5" src="/delete-icon.svg" alt="" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
