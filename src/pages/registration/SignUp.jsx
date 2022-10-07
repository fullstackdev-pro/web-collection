import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp(props) {
  // Password validation
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState("");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

  useEffect(() => {
    if (isCPasswordDirty) {
      if (password === cPassword) {
        setShowErrorMessage(false);
        setCPasswordClass("focus:ring focus:outline-none focus:ring-green-400");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("focus:ring focus:outline-none focus:ring-red-400");
      }
    }
  }, [cPassword]);

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };

  //server
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeUserName = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  async function Register() {
    if (userName && email && password && password === cPassword) {
      await axios
        .post("http://localhost:5000/api/register", {
          username: userName,
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className="bg-blue-400 p-10 pt-[4.5rem] h-[100vh] sm:px-40 md:px-[16rem] lg:px-[23rem] lg:pt-[4rem] xl:px-[30rem] xl:pt-[5.5rem]">
      <form className="p-8 pb-0 border-[1px] border-b-0 bg-white rounded-t-xl">
        <p htmlFor="" className="block text-center text-3xl font-semibold">
          Sign Up
        </p>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          className="w-full border-[1px]  py-1 px-3 rounded-sm"
          placeholder="Enter Username"
          required
          onChange={handleChangeUserName}
        />
        <input
          type="email"
          name="email"
          id="email"
          className="w-full border-[1px] mt-4 py-1 px-3 rounded-sm"
          placeholder="Enter Email"
          required
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          className="w-full border-[1px] mt-4 py-1 px-3 rounded-[4px]"
          placeholder="Enter Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          name="cpassword"
          id="confirmPassword"
          value={cPassword}
          className={`w-full border-[1px] mt-4 py-1 px-3 rounded-[4px] ${cPasswordClass}`}
          placeholder="Confirm Password"
          required
          onChange={handleCPassword}
        />
        {/* Input validate message */}
        {showErrorMessage && isCPasswordDirty ? (
          <div> Passwords did not match </div>
        ) : (
          ""
        )}
        <button
          className="mt-8 py-1 w-full text-center text-white bg-blue-500 rounded-[4px]"
          onClick={() => {
            Register();
          }}
        >
          Sign Up
        </button>
      </form>
      <div className="bg-white text-center pb-4 rounded-b-xl px-8">
        <p className="py-4">or</p>
        <div className="mx-4 flex justify-around">
          <FcGoogle className="text-2xl cursor-pointer" />
          <FaFacebook className="text-2xl cursor-pointer text-[#3b5998]" />
          <FaApple className="text-2xl cursor-pointer" />
          <FaTwitter className="text-2xl cursor-pointer text-[#00acee]" />
        </div>
        <p className="mt-4">
          Already a user?{" "}
          <Link to="/logIn" className="text-blue-400">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
