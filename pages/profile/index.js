import React, { useEffect, useState } from 'react'
import { getFirestore,getDocs,collection } from "firebase/firestore";
import app from "@/config/Firebase";
import { query, where } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import PostDetails from '../components/PostDetails';
import { doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Profile() {
      const db = getFirestore(app);
     const { data: session } = useSession()
const [userProfile,setUserProfile]=useState([])

     useEffect(()=>{
userPosts()
     },[session])
     
     const userPosts=async()=>{

if(session?.user?.email) {
    
    const q = query(collection(db, "posts"), where("email", "==",
         session?.user?.email));
    
    const querySnapshot = await getDocs(q);

const posts=[]

    querySnapshot.forEach((doc) => {
      posts.push({id:doc.id,...doc.data()})
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  // setUsserProfile(userProfile=>[...userProfile,doc.data()])
  
    });
    setUserProfile(posts)
}


     }
     const deletePost=async(id) => {
       await deleteDoc(doc(db, "posts", id));
           toast.success("Data has been deleted successfully !");
       setUserProfile((prev)=>prev.filter((post)=>post.id!==id))
     }
     
  return (  
    <div className='m-20'>
        <ToastContainer/>
      <h1 className='my-10 font-bold text-[35px] text-[#e88b00]'>Your Posts</h1>
  <div className='gap-6 p-10 mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
  {userProfile.map((item)=>(
    <div className='relative'>
    <PostDetails post={item}/>
    <button onClick={()=>deletePost(item.id)} className='bg-red-600 hover:bg-red-700 text-white
    px-3 py-1 rounded absolute top-2 right-2'>Delete</button>
    </div>
  ))}
  </div>
    </div>
  )
}

export default Profile
