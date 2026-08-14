import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("API URL:", apiUrl);
console.log("Email:", email);
console.log("Password:", password);
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-center w-full max-w-md p-10 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl text-gray-800 mb-8">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-24 text-left">Email:</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <div className="flex items-center">
            <label className="w-24 text-left">Password:</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;