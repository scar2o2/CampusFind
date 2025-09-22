import { supabase } from "./src/config/supabase";

export const addUser = async (user) => {
  const { data, error } = await supabase
    .from("user")
    .insert([user]);
  if (error) console.error(error);
  return data;
};

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("user")
    .select("*");
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
