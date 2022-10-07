import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function LogIn(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  async function Login() {
    if (email && password) {
      await axios
        .post("http://localhost:5000/api/login", {
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
    <div className="bg-blue-400 p-10 pt-24 h-[100vh] sm:px-40 md:px-[16rem] lg:px-[23rem] lg:pt-[5rem] xl:px-[30rem] xl:pt-[7rem]">
      <form className="p-8 pb-0 border-[1px] border-b-0 bg-white rounded-t-xl">
        <p htmlFor="" className="block text-center text-3xl font-semibold">
          Log In
        </p>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          className="w-full border-[1px]  py-1 px-3 rounded-sm"
          placeholder="Enter Email"
          required
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="w-full border-[1px] mt-6 py-1 px-3 rounded-[4px]"
          placeholder="Enter Password"
          required
          onChange={handleChangePassword}
        />
        <button
          onClick={() => {Login()}}
          className="mt-8 py-1 w-full text-center text-white bg-blue-500 rounded-[4px]"
        >
          Log In
        </button>
      </form>
      <div className="bg-white text-center pb-4 rounded-b-xl px-8">
        <div className="text-right ">
          <button className="text-center text-blue-400 pt-2">
            Forgot Password?
          </button>
        </div>
        <p className="my-4">or</p>
        <div className="mx-4 flex justify-around">
          <FcGoogle className="text-2xl cursor-pointer" />
          <FaFacebook className="text-2xl cursor-pointer text-[#3b5998]" />
          <FaApple className="text-2xl cursor-pointer" />
          <FaTwitter className="text-2xl cursor-pointer text-[#00acee]" />
        </div>
        <p className="mt-4">
          Need an account?{" "}
          <Link to="/signUp" className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
