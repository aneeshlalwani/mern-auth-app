import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialization

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // setLoading(false);
      dispatch(signInSuccess(data));
      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      // console.log(data);
      // setError(false);
      dispatch(signInFailure());
    } catch (error) {
      // setLoading(false);
      // setError(true);
      // dispatch(signInStart())
      dispatch(signInFailure(error));
    }

    // console.log(data);
  };
  return (
    <>
      <div className="p-3 mx-auto max-w-lg">
        <h1 className="text-3xl text-center my-7 font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 font-semibold">
          <p>Don&apos;t have an account?</p>
          <span className="text-blue-500">
            <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
        <p className="text-red-700 mt-5 font-semibold">
          {error ? error.message || "Something went wrong...." : ""}
        </p>
      </div>
    </>
  );
};

export default SignIn;
