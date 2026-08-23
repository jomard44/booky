import { useState } from "react";

function ProfileForm() {
  const [profileInfo, setProfileInfo] = useState({
    banner: "",
    profilePhoto: "",
    businessName: "",
    services: "",
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/profile/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      });
      if (!response.ok) {
        return "Something went wrong. please try again";
      }
      const data = await response.json();
      console.log("profile created succesfully!", profileInfo);
      return data;
    } catch (error) {
      console.error("Somethign went wrong", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white text-center w-full max-w-md p-10 rounded-xl shadow-lg">
        <h1 className="font-bold text-2xl text-gray-800 mb-8">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="w-24 text-left">Banner Image:</label>

            <input
              type="text"
              value={profileInfo.banner}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, banner: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <div className="flex items-center">
            <label className="w-24 text-left">Profile photo:</label>

            <input
              type="text"
              value={profileInfo.profilePhoto}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, profilePhoto: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 text-left">Business name:</label>

            <input
              type="text"
              value={profileInfo.businessName}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, businessName: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 text-left">Services:</label>

            <input
              type="text"
              value={profileInfo.services}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, services: e.target.value })
              }
              className="bg-gray-100 rounded px-3 py-2 flex-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}
export default ProfileForm;
