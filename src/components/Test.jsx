import { useState } from "react";
import { Upload } from "lucide-react";
import { getUploadImageUrl } from "../../supabaseRoutes/supabaseUploadImageGetURl";

const Test = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImg = async () => {
    if (!imageFile) return alert("Please select an image first");

    const url = await getUploadImageUrl(imageFile);
    if (url) setImageUrl(url);
  };

  return (
    <div>
      Test Image Upload
      <label className="flex items-center gap-2 font-medium text-gray-800">
        <Upload size={16} /> Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-5 bg-gray-300"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      {imageFile && (
        <div className="mt-4">
          <p>Selected Image Preview:</p>
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image URL:</p>
          <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
        </div>
      )}
      <button
        onClick={uploadImg}
        className="p-3 bg-blue-500 hover:bg-blue-200 active:p-3 active:text-xl"
      >
        Submit
      </button>
    </div>
  );
};

export default Test;
