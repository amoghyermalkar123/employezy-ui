import { useState } from "react";
import authFunc from "../controllers/UserController";
import zustandStore from "../store/ZustandStore";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  //   const url = import.meta.env.VITE_SUPABASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOrg, setIsOrg] = useState(false);

  const { setUserId } = zustandStore();
  const isLoading = zustandStore(state => state.isLoading);
  const { setIsLoading, setUserExpiryIn } = zustandStore();

  const register = async () => {
    setIsLoading(true);
    const res = await authFunc.registerUser(
      email,
      password.toString(),
      isOrg
    );

    if (res.status === "ok") {
      setUserId(res.candidateID!);
      setIsLoading(false);
      if (res.sessionExpiryIn) {
        setUserExpiryIn(res.sessionExpiryIn);
      }
      navigate("/login");
    } else if (res.status === "isOrg") {
      setIsLoading(false);
      navigate("/admin");
    } else if (res.status === "notOrg") {
      setIsLoading(false);
      navigate("/register");
    } else {
      alert("Error" + res.status);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen">
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
          <div className="h-full flex flex-col justify-center md:h-1/2 w-1/2">
            <h2 className="text-4xl font-bold">Welcome to</h2>
            <h2 className="text-4xl">EmployEzy</h2>
            <label className="cursor-pointer label">
              <span className="label-text">Are you an Organisation</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={() => setIsOrg(!isOrg)}
              />
            </label>
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              onChange={e => setName(e.target.value)}
            />
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
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full my-2"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full my-2"
            />
            <button className="btn btn-primary w-full mt-5" onClick={register}>
              {isLoading
                ? <span className="loading loading-dots loading-md" />
                : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
