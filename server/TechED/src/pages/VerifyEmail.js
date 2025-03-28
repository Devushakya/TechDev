

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { LuTimerReset } from "react-icons/lu";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accountType, firstName, lastName, email, password, confirmPassword } =
    signupData;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
      {loading ? (
        <div className="flex flex-row items-center justify-center h-screen   w-full">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <p className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] text-center">
            Verify Email
          </p>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100 text-center">
            A OTP has been sent to you on your given Email. Enter it below.
          </p>
          <form onSubmit={submitHandler} className="flex items-center flex-col">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
            />
            <button
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
              type="submit"
            >
              verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email,navigate))}
            >
              <LuTimerReset />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
