import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { actionCreators } from '../../state';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../photos/logo192.png'

export function TopNav2({ darkMode, scrollToInfo }) {

    const { isAuthenticated, isLoading, loginWithRedirect, logout, } = useAuth0();

    const [dropDown, setDropDown] = useState(false);
    const [menuDropDown, setMenuDropDown] = useState(false);

    const dispatch = useDispatch()
    const { setisLoadingComponent } = bindActionCreators(actionCreators, dispatch)
    const isLoadingComponent = useSelector((state) => state.isLoadingComponent )
    const destroyer = useSelector((state) => state.destroyer)

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

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault(); // Prevent the default link behavior
        navigate('/'); // Manually navigate to the home route
    
        // Delay the scroll operation slightly to ensure navigation is completed
        setTimeout(() => {
          scrollToInfo(); // Scroll to infoRef
          setMenuDropDown(false);
        }, 10);
      };

      const navigateTo = (route) => {
        navigate(route)
      }

      const handleNavigateCustomRoute = (route) => (e) => {
        e.preventDefault();
        navigateTo(route);
        setMenuDropDown(false);
      }

    return (
        <>

            {/* max-md:border-y-2 max-md:-mt-2 max-md:border-[#1D4ED8] max-md:h-[40px] max-md:bg-[#1D4ED8] */}
            {/* <div className={`${darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 border-b-2 border-neutral-600' : ` */}
            <div className='relative z-20'>
                <div className={` ${isLoadingComponent && darkMode ? '' : 'border-b- border-zinc-400'} ${darkMode ? 'bg-zinc-800 ' : `
             bg-transparent`} absolute md:pt-3 pb-3 max-md:left-[50%] max-md:-translate-x-1/2 max-md:pt-5 flex overflow-hidden pl-4 select-none`}
                    draggable="false">



                    <Link to='/' className='no-underline '>
                        <div className={`${darkMode ? '[&>*]:text-zinc-200 group ' : 'group [&>*]:text-orange-300'} flex space-x-2 font-semibold text-xl`}>
                            <div
                                // onClick={pageFalse}
                                className='group-hover:text-white'>Rainbow</div>
                            {/* <Link to='/darkness' className='no-underline'> */}
                            <div
                                // onClick={pageTrue}
                                className=' group-hover:text-white'>Darkness</div>
                            {/* <div className='tracking-widest'> <span className='text-red-400 absolute left-0 bg-green-800 font-serif'>STAGING ENV</span> </div> */}
                        </div>
                    </Link>
                </div>

                <div className='absolute max-md:hidden right-[50%] translate-x-1/2 [&>*]:text-gray-400  top-[18px] flex gap-16'>

                    <Link to='/' className='hover:cursor-pointer no-underline hover:text-gray-300' onClick={handleNavigate}>
                        Info
                    </Link>
                    <Link onClick={e => setisLoadingComponent(true)} to='/darkness' className='no-underline hover:text-gray-300'>
                        DevLog
                    </Link>
                    <div>
                        Stats
                    </div>

                </div>

                <div className='select-none top-[14px]  text-white  '>
                    <div>
                        {
                            isLoading ? <><div className="tracking-tighter text-zinc-400 animate-pulse">Loading...</div></>
                                : isAuthenticated ?
                                    <>
                                        <div className=''>
                                        {/* <div onClick={AccountDropDown} className={dropDown ? 'text-white hover:cursor-pointer' : 'text-zinc-300 hover:cursor-pointer hover:text-white'}>
                                            Account
                                        </div>
                                        <div className={dropDown ? "absolute w-[240px] z-50  -right-20 top-12 bg-zinc-500" : 'hidden'}>
                                            <div className="flex gap-2 pt-2 pb-2   flex-col">
                                                <Link to='/profile' className=' no-underline text-inherit'>
                                                    <div className=" hover:cursor-pointer hover:bg-white hover:text-zinc-800 flex justify-center items-center  overflow-hidden w-full text-center">
                                                        
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
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
                                        </div> */}


                                        <div className='md:hidden absolute max-md:px-4 md:left-4 top-3 md:p-2 -z-30'>
                                            <svg onClick={() => setMenuDropDown(!menuDropDown)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className={menuDropDown ? "hidden" : "bi bi-list hover:text-zinc-200"} viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg>
                                            <svg onClick={() => setMenuDropDown(!menuDropDown)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={menuDropDown ? "ml-[3px] mb-2 mt-[4px] bi bi-x-lg hover:text-zinc-200" : "hidden"} viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                </svg>

                                                <div className={menuDropDown ? "bg-white [&>*>div]:text-lg [&>*>p]:text-zinc-400 [&>*>div]:font-semibold [&>*]:no-underline [&>*>div]:text-zinc-600 w-[350px] gap-6 flex flex-col  p-4 rounded-lg shadow-lg" : "hidden"}>
                                                    <Link to='/' onClick={handleNavigate} className='hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600'>
                                                        {/* <Link to='/' onClick={handleNavigate}> */}
                                                        <div>Info</div>
                                                        <p>Learn more about Rainbow Darkness.</p>
                                                    </Link>
                                                    <Link onClick={handleNavigateCustomRoute('/darkness')} className='hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600'>
                                                        <div>DevLog</div>
                                                        <p>Progress updates for the website.</p>
                                                    </Link>
                                                    <Link 
                                                    // onClick={handleNavigateCustomRoute('/progress')} 
                                                    className='hover:cursor-default [&>*]:text-zinc-400'>
                                                        <div className='text-zinc-400'>Progress</div>
                                                        <p className='text-zinc-400'>Coming soon!</p>
                                                    </Link>
                                                    <div
                                                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                                        className=" no-underline  text-zinc-800 hover:text-black flex gap-[14px] items-center border-t-2 pt-4 hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                            </svg>
                                                        </div>
                                                        <div className='ml-2'>Log out</div>
                                                    </div>
                                                    <Link to='/' onClick={() => setMenuDropDown(false)} className='no-underline  text-zinc-800 hover:text-black flex gap-4 items-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                                        </svg>
                                                        <div>Home</div>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </> :
                                    <div>
                                        {/* Desktop topnav */}
                                        <div className='max-md:hidden top-[14px] flex gap-4 absolute right-6 align-middle justify-center hover:text-zinc-200 font-semibold text-zinc-300'>
                                            <div
                                                onClick={() => loginWithRedirect()}
                                                className="hover:cursor-pointer   rounded-md p-2 text-sm hover:text-zinc-200 font-semibold text-zinc-300">
                                                Login
                                            </div>
                                            <div className='h-[30px] border-r-2 border-zinc-400' />
                                            <Link to='/' className='no-underline text-zinc-300 hover:text-zinc-200'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                                </svg>
                                            </Link>
                                        </div>

                                        {/* mobile topnav */}
                                        <div className='md:hidden absolute max-md:px-4 md:left-4 top-3 md:p-2 -z-30'>
                                            <svg onClick={() => setMenuDropDown(!menuDropDown)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className={menuDropDown ? "hidden" : "bi bi-list hover:text-zinc-200"} viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                            </svg>
                                            <svg onClick={() => setMenuDropDown(!menuDropDown)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={menuDropDown ? "ml-[3px] mb-2 mt-[4px] bi bi-x-lg hover:text-zinc-200" : "hidden"} viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>

                                            <div className={menuDropDown ? "bg-white [&>*>div]:text-lg [&>*>p]:text-zinc-400 [&>*>div]:font-semibold [&>*]:no-underline [&>*>div]:text-zinc-600 w-[350px] gap-6 flex flex-col  p-4 rounded-lg shadow-lg" : "hidden"}>
                                                <Link  to='/' onClick={handleNavigate} className='hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600'>
                                                {/* <Link to='/' onClick={handleNavigate}> */}
                                                    <div>Info</div>
                                                    <p>Learn more about Rainbow Darkness.</p>
                                                </Link>
                                                <Link onClick={handleNavigateCustomRoute('/darkness')} className='hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600'>
                                                    <div>DevLog</div>
                                                    <p>Progress updates for the website.</p>
                                                </Link>
                                                <div className='hover:cursor-default'>
                                                    <div>Stats</div>
                                                    <p>Coming soon.</p>
                                                </div>
                                                <div onClick={() => loginWithRedirect()} className='hover:cursor-pointer [&>div]:hover:text-black [&>p]:hover:text-zinc-600'>
                                                    <div>Login</div>
                                                    <p>Not registered? Create an account for free.</p>
                                                </div>
                                                <Link to='/' onClick={() => setMenuDropDown(false)} className='no-underline  text-zinc-800 hover:text-black flex gap-4 items-center border-t-2 pt-4'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                                    </svg>
                                                    <div>Home</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>


                        }
                    </div>
                </div>

            </div>
        </>
    )
}