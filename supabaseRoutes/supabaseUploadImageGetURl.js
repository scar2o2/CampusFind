import { supabase } from "../src/config/supabase";

const IMAGE_SIZE = 500;
const IMAGE_QUALITY = 0.88;

const readImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(imageFile);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to read selected image."));
    };

    image.src = objectUrl;
  });
};

const canvasToBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Unable to resize selected image."));
      },
      "image/jpeg",
      IMAGE_QUALITY
    );
  });
};

export const getSquareImageFile = async (imageFile) => {
  const image = await readImage(imageFile);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = IMAGE_SIZE;
  canvas.height = IMAGE_SIZE;
  context.drawImage(image, 0, 0, IMAGE_SIZE, IMAGE_SIZE);

  const blob = await canvasToBlob(canvas);
  const fileName = imageFile.name.replace(/\.[^/.]+$/, "") || "found-item";

  return new File([blob], `${fileName}.jpg`, { type: "image/jpeg" });
};

export const getUploadImageUrl = async (imageFile) => {
  const squareImageFile = await getSquareImageFile(imageFile);
  const fileName = `${Date.now()}.jpg`;
  const filePath = `uploads/${fileName}`;

  // Upload
  const { error: uploadError } = await supabase.storage
    .from('found-items-test')
    .upload(filePath, squareImageFile, {
      contentType: squareImageFile.type,
      upsert: false,
    });

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
