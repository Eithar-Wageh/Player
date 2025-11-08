import React from "react";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoLocationOutline } from 'react-icons/io5';
function PostDetails({ post }) {
  const formattedData=post?.Date?
  new Date(post?.Date.seconds*1000).toLocaleDateString():"no date";
  return (
    <div className="max-w-sm p-6 bg-white border
     border-gray-200 rounded-lg shadow-sm
     ">
      <img src={post?.image} alt="img" className="rounded-t-lg h-[350px] w-[100%] object-cover"/>
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight
         text-gray-900">
         {post?.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700
      ">
        {post?.desc}
      </p>

      <p className="mb-3 font-normal text-[#E88B00] flex items-center
      ">
        <span className="mr-3"><HiCalendarDateRange/></span>
        {formattedData}
      </p>
       <p className="mb-3 font-normal text-gray-700 flex items-center
      ">
           <span className="mr-3"><IoLocationOutline/></span>
        {post?.Location}
      </p>
      <a
        href="#"
        className="inline-flex items-center px-3
         py-2 text-sm font-medium text-center
          text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          ></path>
        </svg>
      </a>
    </div>
  );
}

export default PostDetails;
