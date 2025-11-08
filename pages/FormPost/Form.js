import gamesImg from "@/gamesImageData/Data";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, setDoc, doc,Timestamp } from "firebase/firestore";
import app from "../../config/Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

function Form() {
  const db = getFirestore(app);

  const [games, setGames] = useState([]);
  const [inputs, setInputs] = useState({});
  const [imageFile, setImageFile] = useState(null);
const router = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    setGames(gamesImg || []);

    if (session?.user) {
      setInputs((prev) => ({
        ...prev,
        userName: session.user.name || "",
        userImage: session.user.image || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // رفع الصورة عبر ImgBB (شغال 100%)
  async function uploadImage(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    const API_KEY = "3e289d3b22e8b075cef65fa4ea62e39b"; // غيّرها لو عايز

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Bad Request");
      }

      const data = await response.json();
      return data.data.url;
    } catch (err) {
      console.error("Error:", err);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      imageUrl = (await uploadImage(imageFile)) || "";
    }

    await setDoc(doc(db, "posts", Date.now().toString()), {
      ...inputs,
      image: imageUrl,
      Date: inputs.Date ? Timestamp.fromDate(new Date(inputs.Date)) : Timestamp.now(), // الحل الآمن + صحيح
    });
    toast.success("Data has been sent successfully !");

    setTimeout((params) => {
      router.push("/")
    }, 2000
    )
  };

  return (
    <div>
        <ToastContainer/>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto border-1 p-2">
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            onChange={handleChange}
            name="title"
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            onChange={handleChange}
            name="desc"
            id="desc"
            placeholder="Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Date
          </label>
          <input
            onChange={handleChange}
            name="Date" 
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Location
          </label>
          <input
            onChange={handleChange}
            name="Location"  
            type="text"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="location"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="game" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Game
          </label>
          <select
            onChange={handleChange}
            name="game"
            id="game"
            value={inputs.game || ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Choose a Game</option>
            {games.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
            Upload Image
          </label>
          <input
            name="image"
            id="image"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    
    </div>
  );
}

export default Form;