import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../../assets/icons/google.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearRegistrationStatus,
} from "../../features/user/userSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registrationStatus, error } = useSelector((state) => state.user);
  const [inputForm, setInputForm] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    isRemember: true,
  });

  const handleSubmit = (formData) => {
    console.log(formData);
    dispatch(registerUser(formData))
      .then((data) => {
        if (registerUser.fulfilled.match(data)) {
          console.log("User logged in successfully ", data.payload);
          navigate("/animals");
        } else {
          console.error("Error occured ", data.error.message);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    return () => dispatch(clearRegistrationStatus());
  }, [dispatch]);
  useEffect(() => {
    if (registrationStatus === "succeeded") {
      navigate("/auth/login");
    }
  }, [registrationStatus, navigate]);

  return (
    <div className="bg-[#ceddd1]  h-screen flex items-center justify-center">
      <div className="bg-white w-80 rounded-md border-[#bfbebe] border-1 flex items-center justify-center h-11/12">
        <div className="flex flex-col justify-evenly h-full px-7">
          <div className="text-center">
            <h2 className="text-black text-3xl">Sign Up</h2>
            <h1 className=" text-xs">Sign up to continue</h1>
          </div>
          <div>
            <input
              onChange={(e) =>
                setInputForm({ ...inputForm, name: e.target.value })
              }
              type="text"
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter Name"
            />
            <input
              onChange={(e) =>
                setInputForm({ ...inputForm, email: e.target.value })
              }
              type="email"
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter Email"
            />
            <input
              onChange={(e) =>
                setInputForm({ ...inputForm, userName: e.target.value })
              }
              type="text"
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter Username"
            />
            <input
              onChange={(e) =>
                setInputForm({ ...inputForm, password: e.target.value })
              }
              type="text"
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter Password"
            />
            <button
              onClick={() => handleSubmit(inputForm)}
              className="bg-[#146826] w-full text-white rounded-md h-7 mb-3 mt-2 hover:bg-[#22561b]"
            >
              Sign In
            </button>
            <div className="flex justify-between">
              <label htmlFor="remember" className="text-xs">
                <input
                  checked={inputForm.isRemember}
                  onChange={() =>
                    setInputForm({
                      ...inputForm,
                      isRemember: !inputForm.isRemember,
                    })
                  }
                  type="checkbox"
                  className="mr-1"
                  name="remember"
                  id="remember"
                />
                Remember me
              </label>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-[#146826] underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
