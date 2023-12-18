function LoginPage() {
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
            <div className="label  mt-10">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <div className="label mt-5">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full mt-5">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
