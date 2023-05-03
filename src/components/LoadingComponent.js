import React from "react";
import spinner from '../photos/spinner.gif'
import { useAuth0 } from "@auth0/auth0-react";

export function LoadingComponent () {

    const { isAuthenticated } = useAuth0()

    return (
        <>
        <div className=" animate-pulse text-zinc-500 flex flex-col justify-center items-center align-middle">
<div>Loading Account Data...</div>
<img className="   h-[80px]" src={spinner} alt='Loading_spinner.gif' />
<div>{isAuthenticated ? <div className="text-green-500">Authenticated</div> : 'Authenticating...'}</div>
        </div>
        </>
    )
}