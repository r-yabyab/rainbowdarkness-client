import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../photos/logo512.png'
import { useAuth0 } from '@auth0/auth0-react'

export function TopNav({ pageDetect, setPageDetect, darkMode }) {

// Auth0 shit
    const LoginButton = () => {
        const { loginWithRedirect } = useAuth0();

        return <button onClick={() => loginWithRedirect()}>Log In</button>;
    };

    const LogoutButton = () => {
        const { logout } = useAuth0();

        return (
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        );
    };

    const Profile = () => {
        const { user, isAuthenticated, isLoading } = useAuth0();
      
        if (isLoading) {
          return <div>Loading ...</div>;
        }
      
        return (
          isAuthenticated && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )
        );
      };

    
// for detecting which page is selected, Deprecated don't use
    const pageFalse = () => {
        setPageDetect(false)
    }

    const pageTrue = () => {
        setPageDetect(true)
    }

    return (
        <>

            {/* max-md:border-y-2 max-md:-mt-2 max-md:border-[#1D4ED8] max-md:h-[40px] max-md:bg-[#1D4ED8] */}
            <div className={`${darkMode ? 'inset-0 bg-gradient-to-r to-[#121212] from-zinc-700 border-b-2 border-neutral-600' : `
             bg-zinc-800`} relative pt-2 pb-2 flex overflow-hidden justify-content-center select-none`}
                draggable="false">


                <div className={`${darkMode ? '[&>*]:text-yellow-200' : '[&>*]:text-yellow-200'} flex space-x-2 font-semibold text-xl`}>
                    <Link to='/' className='no-underline'><div onClick={pageFalse} className='hover:text-white'>Rainbow</div></Link>
                    <Link to='/darkness' className='no-underline'><div onClick={pageTrue} className=' hover:text-purple-300'>Darkness</div></Link>

                    {/* arrow stuff */}


                </div>

            </div>
            <div className='absolute top-0 text-stone-100 
            max-md:w-[30px] max-md:ml-2'>
                {/* top right sun */}
                <Link to="/"><div className='flex'>
                    <img src={logo} alt="logo" className='w-[100px] select-none md:hidden max-md:hidden' draggable="false" />
                    <img src={logo} alt="logo" className='w-[100px] select-none md:hidden max-md:hidden' draggable="false" />
                </div></Link>



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

    <div className='absolute flex top-2 right-0 mr-24 text-white hover:cursor-pointer '>
        <div className='hover:bg-blue-600'>{LoginButton()} </div>
        <div className='hover:bg-blue-600'>{LogoutButton()}</div>
        <div>{Profile()}</div>

      </div>

        </>
    )
}