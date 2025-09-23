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


export const getAllFoundItems = async () => {
  try {
    const { data, error } = await supabase
      .from("found_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch error:", error);
      return [];
    } 
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};

export const getFoundItemsByUser = async (userId) => {
  try {
    const { data, error } = await supabase 
      .from("found_items")
      .select("*")
      .eq("userId", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch error:", error);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
};

export const deleteFoundItem = async (itemId) => {
  try {
    const { data, error } = await supabase
      .from("found_items")
      .delete()
      .eq("id", itemId);  
    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item.");
      return null;
    }
    console.log("Item deleted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong.");
    return null;
  } 
};