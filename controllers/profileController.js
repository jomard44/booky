import Profile from "../model/Profile.js";

export const createProfile = async (req, res) => {
  const { banner, profilePhoto, businessName, services } = req.body;
  try {
    const newProfile = await Profile.create({
      banner,
      profilePhoto,
      businessName,
      services,
    });

    return res
      .status(201)
      .json({ message: "profile created succesfully", newProfile });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "this record does not exist" });
    }
    const { banner, profilePhoto, businessName, services } = req.body;

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: id },
      {
        banner,
        profilePhoto,
        businessName,
        services,
      },
      {
        new: true,
      }
    );
    if (!updatedProfile) {
      return res
        .status(404)
        .json({ message: "Profile does not exist", profile: updatedProfile });
    }
    return res
      .status(200)
      .json({ message: "Profile have been updated!", updatedProfile });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
