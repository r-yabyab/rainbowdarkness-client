import React from 'react'
import { Link } from 'react-router-dom'

export function TopNav() {
    return (
        <>
            <div className='navbar justify-content-center'>
                <ul>
                {/* <Link className='no-underline bg-yellow-500' to="/rainbow2"><li>rainbow2</li></Link>
                <Link className='no-underline bg-purple-300' to="/rainbow3"><li>rainbow3</li></Link> */}

                    <Link className='no-underline text-red-800 bg-purple-300'  to="/" ><li>Rainbow</li></Link>
                    <li>/</li>
                    <Link className='no-underline bg-yellow-500' to="/darkness"><li>Darkness</li></Link>
                </ul>
            </div>
        </>
    )
}