import React, { useEffect } from 'react'
import { useSession} from "next-auth/react"
import { useRouter } from 'next/router';
import Form from '../FormPost/Form';

function CreatPost() {
    
    const { data: session } = useSession()
    const router=useRouter();
    useEffect(()=>{
        if (!session) {
          router.push("/")  
        }
    })
    
  return (
    <div>
   <Form/>
    </div>
  )
}

export default CreatPost
