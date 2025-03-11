import { User } from "@/lib/types";
import Instance from "@/services/Instance";

// Fetches the list of all users
const getUsers = () => {
  return Instance.get("users");
};

// Fetches details of a specific user by ID
const getDetailUsers = (id: number) => {
  return Instance.get(`users/${id}`);
};

// Updates a specific user's information
const updateUser = (id: number, data: User) => {
  return Instance.put(`users/${id}`, data);
};

// Consolidating all API functions into a single object
const UserAPIs = {
  getUsers,
  getDetailUsers,
  updateUser,
};

export default UserAPIs;
