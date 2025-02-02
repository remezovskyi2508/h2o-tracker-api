import UserCollection from "../db/models/user.js";


export const getUserById = async (id) => {
  return await UserCollection.findById(id);
};


export const updateUser = async (filter, update, options = {}) => {
  const { upsert = false } = options;

  const result = await UserCollection.findOneAndUpdate(
    filter,
    { $set: update },
    {
      new: true,
      upsert,
      runValidators: true,
    }
  );

  if (!result) return null;

  return {
    isNew: upsert && !result._id,
    data: result,
  };
};

