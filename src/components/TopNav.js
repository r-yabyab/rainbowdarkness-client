import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// import Countdown from './Countdown';

export function TopNav({ pageDetect, setPageDetect, darkMode }) {

    const { user, isAuthenticated, isLoading, loginWithRedirect, logout, } = useAuth0();

    const [dropDown, setDropDown] = useState(false)

// Auth0 shit
    const LoginButton = () => {

        return <button onClick={() => loginWithRedirect()}>Log In</button>;
    };

    const LogoutButton = () => {

        return (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        );
    };

    const AccountDropDown = () => {
        setDropDown(!dropDown)
    }

    return (
        <>

            {/* max-md:border-y-2 max-md:-mt-2 max-md:border-[#1D4ED8] max-md:h-[40px] max-md:bg-[#1D4ED8] */}
            {/* <div className={`${darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 border-b-2 border-neutral-600' : ` */}
            <div className={`${darkMode ? 'bg-black' : `
             bg-zinc-800`} relative pt-2 pb-2 flex overflow-hidden justify-content-center select-none`}
                draggable="false">


                <div className={`${darkMode ? '[&>*]:text-yellow-200 group' : 'group [&>*]:text-yellow-200'} flex space-x-2 font-semibold text-xl`}>
                    <Link to='/' className='no-underline '><div
                        // onClick={pageFalse}
                        className='group-hover:text-white'>Rainbow</div></Link>
                    {/* <Link to='/darkness' className='no-underline'> */}
                    <Link to='/' className='no-underline'>
                        <div
                        // onClick={pageTrue}
                        className=' group-hover:text-white'>Darkness</div></Link>
                        {/* <div className='tracking-widest'> <span className='text-red-400 absolute left-0 bg-green-800 font-serif'>STAGING ENV</span> </div> */}
                </div>
            </div>

            <div className='  text-blue-300 md:hidden max-md:hidden   flex         justify-content-center select-none'>
                {pageDetect ?
                    <div className='absolute ml-[80px] top-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                        </svg>
                    </div>
                    : <div className='absolute mr-[80px] top-8'><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                    </svg> </div>}
            </div>

            <div className='absolute flex select-none top-2 right-0 mr-24 text-white hover:cursor-pointer '>
                <div>
                    {
                        isLoading ? <><div className="tracking-tighter text-zinc-400 animate-pulse">Loading...</div></>
                            : isAuthenticated ?
                                <>
                                    <div onClick={AccountDropDown} className={dropDown ? 'text-white hover:cursor-pointer' : 'text-zinc-300 hover:cursor-pointer hover:text-white' }>Account</div>
                                    <div className={dropDown ? "absolute w-[240px] z-50  -right-20 top-12 bg-zinc-500" : 'hidden'}>
                                        <div className="flex gap-2 pt-2 pb-2   flex-col">
                                            <div className=" hover:cursor-text select-text  text-zinc-800  overflow-hidden w-full text-center">
                                                Acc: {user && user.email}
                                            </div>
                                            <div className="   text-bg-zinc-200 w-full text-center hover:cursor-default">
                                                <span className='hover:bg-white hover:text-zinc-800'>{LogoutButton()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </> :
                                <span className="hover:cursor-pointer hover:text-white text-zinc-300">{LoginButton()}</span>
                    }
                    {/* <div className='text-white'><Countdown /></div> */}
                </div>
            </div>


        </>
    )
}