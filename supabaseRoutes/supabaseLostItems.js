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
  try{
    const { data, error } = await supabase
      .from("lost_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching lost items:", error);
      return [];    
    }
    return data;
  }catch(err){
    console.error("Unexpected error:", err);
    return [];
  }
};

  

export const getLostItemByUserId = async (id) => {
  try{
    const { data, error } = await supabase
      .from("lost_items")
      .select("*")
      .eq("userId", id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching lost items by user:", error);
      return [];    
    }
    return data;
  }catch(err){
    console.error("Unexpected error:", err);
    return [];
  }  
};

export const deleteLostItem = async (itemId) => {   
  try{
    const { data, error } = await supabase
      .from("lost_items")
      .delete()
      .eq("id", itemId);
    if (error) {
      console.error("Error deleting lost item:", error);
      return null;    
    } 
    console.log("Lost item deleted successfully.");
    return data;
  }catch(err){
    console.error("Unexpected error:", err);
    return null;
  }
};

