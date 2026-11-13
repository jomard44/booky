import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [profileInfo, setProfileInfo] = useState({
    banner: "",
    profilePhoto: "",
    businessName: "",
    services: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/profile/${id}`);

      if (!response.ok) {
        console.log("Can't load profile");
        return;
      }

      const data = await response.json();

      setProfileInfo(data.profile);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...profileInfo.services];

    newServices[index] = value;

    setProfileInfo({
      ...profileInfo,
      services: newServices,
    });
  };

  const addService = () => {
    setProfileInfo({
      ...profileInfo,
      services: [...profileInfo.services, ""],
    });
  };

  const deleteService = (index) => {
    const newServices = profileInfo.services.filter(
      (_, serviceIndex) => serviceIndex !== index
    );

    setProfileInfo({
      ...profileInfo,
      services: newServices,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await fetch(`${apiUrl}/profile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      });

      if (!response.ok) {
        console.log("Something went wrong. Please try again");
        return;
      }

      const data = await response.json();

      console.log("Profile updated successfully", data);

      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <img
              src={profileInfo.banner}
              alt="Business banner"
              className="w-full h-64 object-cover"
            />

            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <label className="cursor-pointer bg-white/90 hover:bg-white px-5 py-2.5 rounded-lg font-medium shadow">
                Change Banner
                <input
                  type="text"
                  value={profileInfo.banner}
                  onChange={(e) => handleChange("banner", e.target.value)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="px-6 sm:px-10">
            <div className="relative flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="-mt-16 relative z-10">
                <img
                  src={profileInfo.profilePhoto}
                  alt={profileInfo.businessName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-200"
                />

                <input
                  type="text"
                  value={profileInfo.profilePhoto}
                  onChange={(e) => handleChange("profilePhoto", e.target.value)}
                  placeholder="Profile photo URL"
                  className="mt-2 w-32 text-xs border rounded-lg p-2"
                />
              </div>

              <div className="pb-4 flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Business Name
                </label>

                <input
                  type="text"
                  value={profileInfo.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full max-w-md pb-1"
                  placeholder="Business name"
                />

                <p className="text-gray-500 mt-2">
                  Edit your business information
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            <section className="py-8">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Services</h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add, remove, or edit your services
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  + Add Service
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profileInfo.services.map((service, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="font-bold">{index + 1}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteService(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Service
                    </label>

                    <input
                      type="text"
                      value={service}
                      onChange={(e) =>
                        handleServiceChange(index, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Haircut"
                    />
                  </div>
                ))}
              </div>

              {profileInfo.services.length === 0 && (
                <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
                  <p className="text-gray-500">
                    You haven't added any services yet.
                  </p>

                  <button
                    type="button"
                    onClick={addService}
                    className="mt-3 text-blue-600 font-medium hover:underline"
                  >
                    Add your first service
                  </button>
                </div>
              )}
            </section>

            <section className="pb-10">
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Availability
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-5">
                  Your appointment calendar will be configured here.
                </p>

                <div className="border border-gray-200 rounded-xl bg-gray-50 min-h-[250px] flex justify-center items-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                      📅
                    </div>

                    <h3 className="font-semibold text-gray-700">Calendar</h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Calendar settings coming soon
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 py-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(`/profile/${id}`)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
