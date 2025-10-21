import { supabase } from "../src/config/supabase";

export const createFoundItem = async (item) => {
  try {
    const { data, error } = await supabase.from("found_items").insert([item]);

    if (error) {
      console.error("Insert error:", error);
      alert("Failed to post found item.");
      return null;
    }

    alert("Found item posted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while posting the found item.");
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
      alert("Failed to fetch found items.");
      return [];
    } 

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching found items.");
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
      alert("Failed to fetch your found items.");
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching your found items.");
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
      alert("Failed to delete the item.");
      return null;
    }

    alert("Item deleted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while deleting the item.");
    return null;
  } 
};
