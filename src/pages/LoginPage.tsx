import { useState } from "react";
import authFunc from "../controllers/UserController";
import zustandStore from "../store/ZustandStore";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isOrg, setIsOrg] = useState(false);
  const [password, setPassword] = useState("");
  const { setIsLoading, setUserExpiryIn } = zustandStore();
  const isLoading = zustandStore(state => state.isLoading);
  const navigate = useNavigate();
  const { setUserId } = zustandStore();

  const login = async () => {
    setIsLoading(true);
    const res = await authFunc.handleLogin(email, password.toString(), isOrg);

    if (res.status === "ok") {
      setUserId(res.candidateID!);
      setIsLoading(false);
      if (res.sessionExpiryIn) {
        setUserExpiryIn(res.sessionExpiryIn);
      }
      navigate("/home");
    } else if (res.status === "isOrg") {
      setIsLoading(false);
      navigate("/admin");
    } else if (res.status === "notOrg") {
      setIsLoading(false);
      navigate("/register");
    } else {
      alert("Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-base-200">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
        <div className="hidden md:block rounded-xl">
          <div className="h-full flex items-center justify-center">
            <img
              src="login.jpg"
              alt="Login Photo"
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="h-full flex flex-col justify-evenly md:h-2/3 w-2/3">
            <h2 className="text-4xl font-bold md:text-6xl">Welcome to</h2>
            <h2 className="text-4xl tracking-widest">EmployEzy</h2>
            <div className="dropdown mt-5">
              <div tabIndex={0} role="button" className="btn m-1">
                Are You An Organisation?
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => setIsOrg(true)}>
                  <a>Yes</a>
                </li>
                <li onClick={() => setIsOrg(false)}>
                  <a>No</a>
                </li>
              </ul>
            </div>
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={e => setEmail(e.target.value)}
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex flex-wrap justify-between">
              <button className="btn btn-ghost">New User? Click here</button>
              <button className="btn btn-ghost">Forgot Password?</button>
            </div>
            <button
              className="btn btn-outline btn-primary w-full"
              onClick={login}
            >
              {isLoading
                ? <span className="loading loading-dots loading-md" />
                : "Login"}
            </button>
            <div className="divider">OR</div>
            <div className="flex flex-row justify-evenly">
              <button className="btn btn-outline btn-secondary w-1/2 mx-2">
                Google
              </button>
              <button className="btn btn-outline w-1/2 mx-2">GitHub</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
