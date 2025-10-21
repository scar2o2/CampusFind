import { supabase } from "../src/config/supabase";

export const addUser = async (user) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([user]);

    if (error) {
      console.error("Error:", error);
      if (error.code === "23505") {
        alert("User already exists.");
      } else {
        alert(`Failed to add user: ${error.message}`);
      }
      return null;
    }

    alert("User added successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while adding the user.");
    return null;
  }
};

export const checkUser = async (columnName, value) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")           // only need id to check existence
      .eq(columnName, value)  // exact match
      .limit(1);              // stop after first match

    if (error) {
      console.error("Error checking user:", error);
      alert("Failed to check user existence.");
      return null;
    }

    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while checking the user.");
    return null;
  }
};

export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users.");
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching users.");
    return [];
  }
};

export const getUser = async (columnName, value) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq(columnName, value)
      .limit(1);

    if (error) {
      console.error("Error fetching user:", error);
      alert("Failed to fetch user.");
      return null;
    }

    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching the user.");
    return null;
  }
};

export const updateUser = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
      return null;
    }

    alert("User updated successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while updating the user.");
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
      return null;
    }

    alert("User deleted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while deleting the user.");
    return null;
  }
};
