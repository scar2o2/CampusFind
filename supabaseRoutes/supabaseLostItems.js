import { supabase } from "../src/config/supabase";

// const lostItem= {
//     userId: 20,
//     name: "Black Wallet",
//     description: "A black leather wallet with multiple card slots and a coin pocket.",
//     lostDate: "2023-10-15",
//     location: "Central Park, near the fountain",
//     category: "accessories",
// }

export const createLostPost = async (lostItem) => {
  try {
    const { data, error } = await supabase
      .from("lost_items")
      .insert([lostItem]);

    if (error) {
      console.error("Error:", error.message);
      alert("Failed to post lost item.");
      return null;
    }

    alert("Lost item posted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while posting the lost item.");
    return null;
  }
};

export const fetchLostItems = async () => {
  try {
    const { data, error } = await supabase
      .from("lost_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching lost items:", error);
      alert("Failed to fetch lost items.");
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching lost items.");
    return [];
  }
};

export const getLostItemByUserId = async (id) => {
  try {
    const { data, error } = await supabase
      .from("lost_items")
      .select("*")
      .eq("userId", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching lost items by user:", error);
      alert("Failed to fetch your lost items.");
      return [];
    }

    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while fetching your lost items.");
    return [];
  }
};

export const deleteLostItem = async (itemId) => {
  try {
    const { data, error } = await supabase
      .from("lost_items")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Error deleting lost item:", error);
      alert("Failed to delete the lost item.");
      return null;
    }

    alert("Lost item deleted successfully.");
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong while deleting the lost item.");
    return null;
  }
};
