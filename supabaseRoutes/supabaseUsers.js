import { supabase } from "../src/config/supabase";

export const addUser = async (user) => {
  const { data, error } = await supabase
    .from("users")
    .insert([user]);
  if (error) console.error("error:", error.code==='23505'? "User already exists": error.message);
  return data;
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
      return null;
    }

    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*");
  if (error) console.error(error);
  return data;
};

export const getUser = async (columnName,value) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq(columnName,value)
    .limit(1);
  if (error) console.error(error);
  return data;
};

export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id);
  if (error) console.error(error);
  return data;
};

export const deleteUser = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);
  if (error) console.error(error);
  return data;
};