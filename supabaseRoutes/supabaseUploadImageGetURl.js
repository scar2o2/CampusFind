import { supabase } from "../src/config/supabase";

export const getUploadImageUrl = async (imageFile) => {
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // Upload
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('found-items-test')
    .upload(filePath, imageFile);

  if (uploadError) {
    console.error("Upload error details:", uploadError);
    return null;
  }

  // Get public URL
  const { data } = supabase.storage
    .from('found-items-test')
    .getPublicUrl(filePath);

  return data.publicUrl;
};