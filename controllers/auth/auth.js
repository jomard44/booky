import Auth from "../../model/Auth.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.create({
      email,
      password,
    });

    res.status(201).json({
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Welcome back", user });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
