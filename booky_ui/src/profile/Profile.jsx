import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    banner: "",
    profilePhoto: "",
    businessName: "",
    services: [],
  });

  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const getProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/profile/${id}`);

      if (!response.ok) {
        console.log("Can't load data");
        return;
      }

      const data = await response.json();

      console.log(data);
      setProfileInfo(data.profile);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
        <div className="relative">
          <img
            src={profileInfo.banner}
            alt="Business banner"
            className="w-full h-64 object-cover"
          />

          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-6 sm:px-10">
          <div className="relative flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="-mt-16 relative z-10">
              <img
                src={profileInfo.profilePhoto}
                alt={profileInfo.businessName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-200"
              />
            </div>

            <div className="pb-4 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {profileInfo.businessName}
              </h1>

              <p className="text-gray-500 mt-1">Professional services</p>
            </div>

            <div className="pb-4">
              <Link
                to={`/profile/${id}/update`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <section className="py-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Services</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Services offered by this business
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {profileInfo.services.length} services
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileInfo.services.map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition bg-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <span className="font-bold">{index + 1}</span>
                  </div>

                  <h3 className="font-semibold text-gray-900">{service}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Professional service
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="pb-10">
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-gray-900">Availability</h2>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Choose a date and time to book an appointment.
              </p>

              <div className="border border-gray-200 rounded-xl bg-gray-50 min-h-[250px] flex justify-center items-center">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                    📅
                  </div>

                  <h3 className="font-semibold text-gray-700">Calendar</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Appointment calendar coming soon
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
