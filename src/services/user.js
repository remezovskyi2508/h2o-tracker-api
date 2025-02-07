import SessionCollection from "../db/models/session.js";
import UserCollection from "../db/models/user.js";


export const getUserById = async (id) => {

  console.log('Searching for user with id:', id);
  const user = await UserCollection.findById(id);
  console.log('Found user:', user);
  return user;

};
export const getUser = (filter) => UserCollection.findOne(filter);



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
    isNew: upsert,
    data: result,
  };
};
export const getSession = (filter) => SessionCollection.findOne(filter);
