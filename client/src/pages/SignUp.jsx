import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="p-3 mx-auto max-w-lg">
        <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Email"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
            Sign up
          </button>
        </form>
        <div className="flex gap-2 mt-5 font-semibold">
          <p>Have an account?</p>
          <span className="text-blue-500">
            <Link to="/sign-in">Sign in</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
