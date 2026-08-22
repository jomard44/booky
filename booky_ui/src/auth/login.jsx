import { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("welcome", data);
      }else{
        console.error(data.message)
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-center w-full max-w-md p-10 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl text-gray-800 mb-8">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-24 text-left">Email:</label>

            <input
              type="email"
              value={loginInfo.email}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <div className="flex items-center">
            <label className="w-24 text-left">Password:</label>

            <input
              type="password"
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo((prev) => ({ ...prev, password: e.target.value }))
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div>
          <p>already have an account?</p>
          <Link className="text-blue-600" to="/register">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
