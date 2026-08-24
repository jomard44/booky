import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    banner: "",
    profilePhoto: "",
    businessName: "",
    services: [],
  });
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/profile/${id}`);
      if (!response.ok) {
        return "Can't load data";
      }

      const data = await response.json();
      console.log(data);
      setProfileInfo(data.profile);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className=" flex justify-center items-center flex-col text-center m-4  bg-blue-300 ">
      <div className="flex justify-center items-center flex-col">
        <img
          className="border  w-[75em] h-[10em] rounded"
          src={profileInfo.banner}
          alt=""
        />
        <div className="flex justify-center items-center flex-col mt-4 ">
          <img
            className="w-[5em] h-[5em] rounded-full bg-red-300"
            src={profileInfo.profilePhoto}
            alt=""
          />
          <h2 className="font-bold text-lg">{profileInfo.businessName}</h2>
          <p className=" text-gray-600">address of the business</p>
        </div>
      </div>
      <div className=" w-[25em]">
        <h2 className="text-lg font-bold">Services</h2>
        <ul className="border rounded">
          {profileInfo.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      <div className="m-4">
        <h2>Calandar</h2>
        <div className="w-[50em] h-[10em] bg-gray-100 mb-10 "></div>
      </div>
    </div>
  );
}

export default Profile;
