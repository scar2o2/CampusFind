import { supabase } from "../src/config/supabase";

// const lostItem= {
//     userId: 20,
//     name: "Black Wallet",
//     description: "A black leather wallet with multiple card slots and a coin pocket.",
//     lostDate: "2023-10-15",
//     location: "Central Park, near the fountain",
//     category: "accessories",
// }

export const createLostPost =async(lostItem)=>{
    const { data, error } = await supabase
    .from("lost_items")
    .insert([lostItem]);
  if (error) console.error("error:", error.message);
  else console.log("Lost item posted");
  return data;
}

export const fetchLostItems = async () => {
    const { data, error } = await supabase
      .from("lost_items")
      .select("*");
    if (error) console.error("Error fetching lost items:", error);
    return data;
  };

export const getLostItemByUserId = async (id) => {
    const { data, error } = await supabase
      .from("lost_items")
      .select("*")
      .eq("userId", id)
      .single();
    if (error) console.error("Error fetching lost item by ID:", error);
    return data;
  };

