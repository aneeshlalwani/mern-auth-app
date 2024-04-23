import { Link } from "react-router-dom";
import { useState } from "react";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  // console.log(formData);
  // THIS IS A ASYNC FUNCTION BECAUSE WE ARE ADDING DATA TO DATABASE
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      // console.log(data);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }

    // console.log(data);
  };
  return (
    <>
      <div className="p-3 mx-auto max-w-lg">
        <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 font-semibold">
          <p>Have an account?</p>
          <span className="text-blue-500">
            <Link to="/sign-in">Sign in</Link>
          </span>
        </div>
        <p className="text-red-700 mt-5 font-semibold">
          {error && "Something went wrong...."}
        </p>
      </div>
    </>
  );
};

export default SignUp;
