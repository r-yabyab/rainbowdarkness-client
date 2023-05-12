import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { actionCreators } from '../../state';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

export function TopNav({ darkMode }) {

    const { isAuthenticated, isLoading, loginWithRedirect, logout, } = useAuth0();

    const [dropDown, setDropDown] = useState(false)

    const dispatch = useDispatch()
    const { setisLoadingComponent } = bindActionCreators(actionCreators, dispatch)

// Auth0 components
    const LoginButton = () => {

        return <button onClick={() => loginWithRedirect()}>LOGIN</button>;
    };

    // const LogoutButton = () => {

    //     return (
    //         <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    //             Log Out
    //         </button>
    //     );
    // };

    const AccountDropDown = () => {
        setDropDown(!dropDown)
    }

    return (
        <>

            {/* max-md:border-y-2 max-md:-mt-2 max-md:border-[#1D4ED8] max-md:h-[40px] max-md:bg-[#1D4ED8] */}
            {/* <div className={`${darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 border-b-2 border-neutral-600' : ` */}
            <div className={`${darkMode ? 'bg-black' : `
             bg-zinc-800`} relative pt-3 pb-3 flex overflow-hidden md:justify-center max-md:pl-4 select-none`}
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

            <Link onClick={e => setisLoadingComponent(true)} to='/darkness' className='no-underline'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor"
                    // onClick={helpHandler} ref={helpRef}
                    className="absolute right-0 text-gray-400  top-[16px] mr-2 
                hover:cursor-pointer hover:text-white
                "
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            </Link>

            {/* <div className='  text-blue-300 md:hidden max-md:hidden   flex         justify-content-center select-none'>
                {pageDetect ?
                    <div className='absolute ml-[80px] top-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                        </svg>
                    </div>
                    : <div className='absolute mr-[80px] top-8'><svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" className="bi bi-triangle-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                    </svg> </div>}
            </div> */}

            <div className='absolute flex select-none top-[18px] right-0 mr-24 text-white  '>
                <div>
                    {
                        isLoading ? <><div className="tracking-tighter text-zinc-400 animate-pulse">Loading...</div></>
                            : isAuthenticated ?
                                <>
                                    <div onClick={AccountDropDown} className={dropDown ? 'text-white hover:cursor-pointer' : 'text-zinc-300 hover:cursor-pointer hover:text-white' }>Account</div>
                                    <div className={dropDown ? "absolute w-[240px] z-50  -right-20 top-12 bg-zinc-500" : 'hidden'}>
                                        <div className="flex gap-2 pt-2 pb-2   flex-col">
                                                <Link to='/profile' className=' no-underline text-inherit'>
                                            <div className=" hover:cursor-pointer hover:bg-white hover:text-zinc-800 flex justify-center items-center  overflow-hidden w-full text-center">
                                                {/* Acc: {user && user.email} */}
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                                    </svg>
                                                </div>
                                                <div className='ml-2'>
                                                    
                                                    Settings
                                                    
                                                </div>
                                            </div>
                                            </Link>
                                            <div
                                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                                className=" hover:bg-white hover:text-zinc-800 hover:cursor-pointer flex justify-center items-center text-bg-zinc-200 w-full text-center">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                    </svg>
                                                </div>
                                                <div className='ml-2'>Log out</div>
                                            </div>
                                        </div>
                                    </div>
                                </> :
                                <span className="hover:cursor-pointer border-2 border-blue-900  rounded-md p-2 text-sm hover:text-zinc-200 font-semibold text-zinc-300">{LoginButton()}</span>
                    }
                    {/* <div className='text-white'><Countdown /></div> */}
                </div>
            </div>


        </>
    )
}