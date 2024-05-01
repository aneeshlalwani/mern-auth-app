import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";

const OAuth = () => {
  // INITIALIZING DISPATCH
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch("/api/google/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      // eslint-disable-next-line no-undef
      dispatch(signInSuccess(data));
      //   console.log(result);
    } catch (error) {
      console.log("couldn't connect to Google", error);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
      >
        Continue with Google
      </button>
    </>
  );
};

export default OAuth;
