import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);

  const handleToggle = () => {
    setSignUp((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = signUp ? "/register" : "/login";
    try {
      const response = await axios
        .post(`http://localhost:3001/api/user${endpoint}`, {
          name,
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user.name));
          setIsOpen();
          alert(res.data.message);
          console.log(res.data);
          setEmail("");
          setPassword("");
          setName("");
        })
        .catch((err) => {
          setError(err?.response?.data?.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="relative flex-auto p-6">
        {signUp && (
          <>
            <label htmlFor="name" className="mb-3 py-1 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}
        <label htmlFor="email" className="mb-3 py-1 font-bold">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mb-3 font-bold">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Password"
        />
      </div>
      {error && <p className="text-red-500 px-6">{error}</p>}
      <div className="flex items-center justify-between p-6 border-t space-x-2 border-solid border-slate-200 rounded-b">
        <p
          className="text-blue-600 ml-2 cursor-pointer hover:underline"
          onClick={handleToggle}
        >
          {signUp
            ? "Already have an account? Login"
            : "Create An Account ? Sign Up"}
        </p>
        <button
          type="submit"
          className="focus:shadow-outline rounded cursor-pointer bg-emerald-500 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus:outline-none"
        >
          {signUp ? "Sign Up" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default InputForm;
