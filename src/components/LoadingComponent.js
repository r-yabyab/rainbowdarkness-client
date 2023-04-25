import React from "react";
import spinner from '../photos/spinner.gif'

export function LoadingComponent () {
    return (
        <>
        <div className=" animate-pulse text-zinc-500 flex flex-col justify-center items-center align-middle">
<div>Loading Account Data...</div>
<img className="   h-[80px]" src={spinner} alt='Loading_spinner.gif' />
        </div>
        </>
    )
}