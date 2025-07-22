import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Google from "../../assets/icons/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/user/userSlice";

function LoginPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [inputType, setInputType] = useState("text");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  useEffect(() => {
    if (isEmail(inputValue)) {
      setInputType("email");
    } else {
      setInputType("text");
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleRememberChange = (e) => {
    setIsRemember((isRemember) => !isRemember);
  };

  const handleSubmit = () => {
    let credentials = {};
    if ((inputValue && inputPassword) || isRemember) {
      if (inputType === "text") {
        credentials["email"] = "";
        credentials["userName"] = inputValue;
        credentials["password"] = inputPassword;
        credentials["isRemember"] = isRemember;
      } else {
        credentials = {
          email: inputValue,
          userName: "",
          password: inputPassword,
          isRemember,
        };
      }
      console.log(credentials);
      dispatch(loginUser(credentials))
        .then((data) => {
          if (loginUser.fulfilled.match(data)) {
            console.log("User logged in successfully ", data.payload);
            navigate("/animals")
          } else {
            console.error("Error occured ", data.error.message);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="bg-[#ceddd1]  h-screen flex items-center justify-center">
      <div className="bg-white w-80 rounded-md border-[#bfbebe] border-1 flex items-center justify-center py-7 ">
        <div className="flex flex-col justify-evenly h-full px-7">
          <div>
            <h2 className="text-gray-400 text-sm">Please enter your details</h2>
            <h1 className="font-bold text-2xl mb-5">Welcome back</h1>
          </div>
          <div>
            <input
              type={inputType}
              value={inputValue}
              onChange={handleInputChange}
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter email or username"
            />
            <input
              type="text"
              value={inputPassword}
              onChange={handlePasswordChange}
              className="border-gray-300 border-b-1 placeholder:text-gray-400 w-full p-1 rounded mb-3"
              placeholder="Enter password"
            />
            <div className="flex justify-between mb-7">
              <label htmlFor="remember" className="text-xs">
                <input
                  onChange={handleRememberChange}
                  value={isRemember}
                  type="checkbox"
                  className="mr-1"
                  name="remember"
                  id="remember"
                />
                Remember for 30 days
              </label>
              <Link
                to="/forgotpassword"
                className="text-xs text-[#146826] underline"
              >
                Forgot password
              </Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-[#146826] w-full text-white rounded-md h-7 mb-3 hover:bg-[#22561b]"
            >
              Sign In
            </button>
            <button className="flex items-center justify-center text-sm border-gray-300 border-1 w-full p-1 rounded">
              <img src={Google} alt="error" className="h-5 mr-1" /> Sign in with
              Google
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-[#146826] underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
