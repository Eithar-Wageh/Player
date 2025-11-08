import React, { useEffect } from 'react'
import PostDetails from './PostDetails';

function Posts({posts}) {
 useEffect(()=>{
 })
 
 
  
  return (
    <div className='gap-6 p-10 mt-10 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
   {posts?.map((item)=>(
<PostDetails  post={item} />

   ))
   }
   </div>
  )
}

export default Posts
