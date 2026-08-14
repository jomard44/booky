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