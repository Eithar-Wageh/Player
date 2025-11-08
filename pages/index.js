import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Hero from "./components/Hero";
import GameImages from "./components/GameImages";
import Search from "./components/Search";
import { getFirestore,getDocs,collection } from "firebase/firestore";
import app from "../config/Firebase";
import { use, useEffect, useState } from "react";
import Posts from "./components/Posts";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const db = getFirestore(app);
const [posts,setPosts]=useState([])
const [allPosts,setAllPosts]=useState([])

  useEffect(()=>{
    getPost()
  },[])
 const getPost=async()=>{
   
  const querySnapshot = await getDocs(collection(db, "posts"));
const posts=[]
const fetchPosts=[]

  querySnapshot.forEach((doc) => {
        posts.push(doc.data())

    // doc.data() is never undefined for query doc snapshots
  // setPosts(posts=>[...posts, doc.data()])
});
 querySnapshot.forEach((doc) => {
        fetchPosts.push(doc.data())

    // doc.data() is never undefined for query doc snapshots
  // setPosts(posts=>[...posts, doc.data()])
});
  setAllPosts(fetchPosts)
    setPosts(posts)

  }
  
const handleSearch=(text) => {
  const filtered=allPosts.filter((post)=>

    post.title.toLowerCase().includes(text.toLowerCase())
)
setPosts(filtered)
}

  return (
    <div >
    <Hero/>
    <Search onSearch={handleSearch}/>
    <GameImages/>
   {posts? <Posts posts={posts}/>:null}
    </div>
  );
}
