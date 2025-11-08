import React, { use } from 'react'
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';
import { useRouter } from 'next/router';

function Header() {
  const router=useRouter();
     const { data: session } = useSession()
      

  return (
    <div className='flex justify-between p-4 cursor-pointer'>
      <img width={100} onClick={()=>router.push("/")}  src="/images/logo.png" alt='logo'/>

<div className='flex items-center gap-3'> 
   {!session? <button onClick={()=>signIn()} className='bg-black p-3 rounded-full text-white'>
      <span className='hidden sm:block' >  Sign In</span>       <HiArrowLeftStartOnRectangle className='block sm:hidden' />

    </button>:<button onClick={()=>signOut()} className='bg-black p-3 rounded-full text-white'>
      <span className='hidden sm:block' >  Sign Out</span>       <HiArrowLeftStartOnRectangle className='block sm:hidden' />

    </button>}
     <button onClick={()=>router.push("/create-post")} className='bg-[#e88b00] p-3 rounded-full text-black'>
      <span className='hidden sm:block'>Create Post</span> 
       <HiMiniPencilSquare className='block sm:hidden' />
    </button>
  <Image width={50} height={50}
      onClick={()=>router.push("/profile")}    className="rounded-full object-cover " src={session?.user?.image||"/images/profile.png"}alt='logo'/>
</div>
     

    </div>
  )
}

export default Header
