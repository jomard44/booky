import { useState } from "react";

function ProfileForm() {
  const [profileInfo, setProfileInfo] = useState({
    banner: "",
    profilePhoto: "",
    businessName: "",
    services: [],
  });

  const [serviceInput, setServiceInput] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (field, value) => {
    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });
  };

  const addService = () => {
    if (!serviceInput.trim()) return;

    setProfileInfo({
      ...profileInfo,
      services: [...profileInfo.services, serviceInput.trim()],
    });

    setServiceInput("");
  };

  const removeService = (index) => {
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

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/profile/create`, {
        method: "POST",
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

      console.log("Profile created successfully!", data);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Business Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Add your business information so customers can discover you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Business Information
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>

                <input
                  type="text"
                  value={profileInfo.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  placeholder="e.g. Jomard's Barbershop"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image URL
                </label>

                <input
                  type="text"
                  value={profileInfo.banner}
                  onChange={(e) => handleChange("banner", e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Add a URL to an image for your business banner.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo URL
                </label>

                <input
                  type="text"
                  value={profileInfo.profilePhoto}
                  onChange={(e) => handleChange("profilePhoto", e.target.value)}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addService();
                      }
                    }}
                    placeholder="e.g. Haircut"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="button"
                    onClick={addService}
                    className="px-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {profileInfo.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg"
                    >
                      <span>{service}</span>

                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="font-bold hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                {loading ? "Creating Profile..." : "Create Profile"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Live Preview
            </h2>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-200">
                {profileInfo.banner ? (
                  <img
                    src={profileInfo.banner}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Banner preview
                  </div>
                )}
              </div>

              <div className="px-6">
                <div className="-mt-12 relative">
                  {profileInfo.profilePhoto ? (
                    <img
                      src={profileInfo.profilePhoto}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-gray-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-300" />
                  )}
                </div>

                <div className="py-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profileInfo.businessName || "Your Business Name"}
                  </h2>

                  <p className="text-gray-500 mt-1">Your business profile</p>
                </div>

                <div className="border-t border-gray-200 py-6">
                  <h3 className="font-bold text-lg mb-4">Services</h3>

                  {profileInfo.services.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {profileInfo.services.map((service, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <p className="font-medium">{service}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      Your services will appear here.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
