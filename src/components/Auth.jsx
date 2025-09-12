import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const {setUser}= useAuth();
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [sState, setSState] = useState("signIn");
  const [errorMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMsg("Signed in with Google successfully!");
      setErrMsg("");
      setUser(auth?.currentUser?.email);
      navigate('/');
    } catch (e) {
      setErrMsg(e.message);
    }
  };

  const SignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await sendEmailVerification(userCredential.user);
      setMsg("Account created! Please check your email to verify.");
      setErrMsg("");
    } catch (e) {
      setErrMsg(e.message);
    }
    setEmail("");
    setPass("");
  };

  const SignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      if (!userCredential.user.emailVerified) {
        setMsg("Please verify your email before signing in.");
        return;
      }
      setMsg("Signed in successfully!");
      setUser(auth?.currentUser?.email);
      setErrMsg("");
      navigate('/');
    } catch (e) {
      setErrMsg(e.message);
    }
    setEmail("");
    setPass("");
  };

  return (
    <div className="flex justify-center items-center flex-1 h-screen">
      <div className="shadow-sm shadow-gray-400 flex justify-center items-center flex-col gap-2 p-6">
        <h1 className="font-bold text-2xl">Welcome</h1>
        <p className="text-gray-600">Sign in to your account or create a new one</p>
        <div className="bg-slate-100 flex flex-row gap-2 rounded-md text-gray-500 text-sm py-1 px-1">
          {sState === "signIn" ? (
            <>
              <div onClick={() => {setSState("signIn"); setErrMsg("");setMsg("");}} className="py-1.5 px-20 font-medium bg-white text-black rounded-md cursor-pointer">
                Sign In
              </div>
              <div onClick={() => {setSState("signUp");setErrMsg("");setMsg("");}} className="py-1.5 px-20 font-medium cursor-pointer">
                Sign Up
              </div>
            </>
          ) : (
            <>
              <div onClick={() => {setSState("signIn");setErrMsg("");setMsg("");}} className="py-1.5 px-20 font-medium cursor-pointer">
                Sign In
              </div>
              <div onClick={() => {setSState("signUp");setErrMsg("");setMsg("");}} className="py-1.5 px-20 font-medium bg-white text-black rounded-md cursor-pointer">
                Sign Up
              </div>
            </>
          )}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-2 text-sm w-full">
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="max-w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 text-sm w-full">
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="max-w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-lg"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
        </div>
        {errorMsg && <span className="text-red-500">{errorMsg}</span>}
        {msg && <span className="text-green-600">{msg}</span>}
        {sState === "signIn" ? (
          <button onClick={SignIn} className="bg-black text-white w-full py-2 px-6 rounded-md cursor-pointer hover:shadow-md hover:shadow-gray-300">
            Sign In
          </button>
        ) : (
          <button onClick={SignUp} className="bg-black text-white w-full py-2 px-6 rounded-md cursor-pointer hover:shadow-md hover:shadow-gray-300">
            Sign Up
          </button>
        )}
        <button onClick={SignInWithGoogle} className="w-full py-2 px-6 rounded-md cursor-pointer flex gap-2 border-2 items-center justify-center hover:shadow-md hover:shadow-gray-300">
          <img className="h-7 p-1" src="/google.svg" alt="" />
          {sState==='signIn'?"Log In with Google":"Sign Up with Google"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
