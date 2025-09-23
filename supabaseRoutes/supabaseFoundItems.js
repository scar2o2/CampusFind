import { supabase } from "../src/config/supabase";

export const createFoundItem = async (item) => {
  try {
    const { data, error } = await supabase.from("found_items").insert([item]);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to post found item.");
      return null;
    }

    console.log("Found item posted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong.");
    return null;
  }
};
