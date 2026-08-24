import Login from "./auth/login";
import Register from "./auth/register";
import ProfileForm from "./profile/components/ProfileForm";
import Profile from "./profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/create" element={<ProfileForm />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
