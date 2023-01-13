import React from 'react'
import { Link } from 'react-router-dom'

export function TopNav() {
    return (
        <>
            <div className='navbar justify-content-center select-none' draggable="false">
                <ul className='text-black [&>*]:font-semibold tracking-tight'>
                {/* <Link className='no-underline bg-yellow-500' to="/rainbow2"><li>rainbow2</li></Link>
                <Link className='no-underline bg-purple-300' to="/rainbow3"><li>rainbow3</li></Link> */}
                    <Link className='no-underline text-red-800 rounded-3xl bg-purple-300 pt-4 pb-10 hover:bg-white hover:text-red-200'  to="/" ><li>Rainbow</li></Link>
                    <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-slash-lg opacity-0" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
</svg>
                    </li>
                    <Link className='no-underline bg-red-500 pt-4 pb-10 hover:bg-green-500 hover:text-black' to="/darkness"><li>Darkness</li></Link>
                    {/* <Link className='no-underline bg-yellow-500 pt-4 pb-10 hover:bg-black hover:text-black' to="/darkness"><li>Darkness</li></Link> */}
                </ul>
            </div>
            <div className='absolute top-0 text-stone-100'>
            <svg xmlns="http://www.w3.org/2000/svg" width="100" fill="currentColor" className="bi bi-brightness-high hover:text-white text-[#1D4ED8]" viewBox="0 0 16 16">
  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>
            </div>
        </>
    )
}