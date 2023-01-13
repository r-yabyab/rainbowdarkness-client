import React, { useEffect, useState } from "react";
// import RainbowDetails from "./RainbowDetails";


export function DataFetch ({reducerValue, destroyer}) {

    const [rainbow, setRainbow] = useState(null)

    useEffect(() => {
        const fetchRainbow = async () => {
            const response = await fetch('https://rainbowdarkness-server.vercel.app/api/rainbows')
            const json = await response.json()

            if (response.ok) {
                setRainbow(json)
            }
        }
        fetchRainbow()
    }, [reducerValue])

   //const rainbow2 = rainbow.number

    return(
        <>
            <div className="
        fixed bottom-[100px] mt-[5em] p-4 select-none text-xl rounded-3xl left-[70px] shadow-red-700 shadow-2xl bg-blue-300 md:hover:bg-[#C4B5FD] from-fuchsia-800
        max-md:bottom-0 max-md:mb-4 max-md:left-[50%] max-md:-translate-x-1/2 max-md:w-full max-md:rounded-none max-md:text-center max-md:bg-black max-md:text-[#2563EB]
        ">
                <p className="font-bold">Global Score</p>
                <p>Daily: <span className="opacity-40">[WIP]</span></p>

                <div className={destroyer ? "ratingAnimationWhite md:bg-black max-md:shadow-white max-md:shadow-inner md:text-slate-100 md:text-center" : "md:bg-black max-md:shadow-white max-md:shadow-inner md:text-slate-100 md:text-center"}>
                    <div>Avg Score     {rainbow && rainbow.map((rainbow, index1) => (

                        <div className=" text-green-400 md:hover:text-yellow-200" key={index1}>
                            {/* <RainbowDetails key={rainbow._id} rainbow={rainbow} /> */}

                            {parseFloat(rainbow.avgPrice).toFixed(2)}
                        </div>

                    ))}
                    </div>
                    <div> Entries {rainbow && rainbow.map((rainbow, index) => (

                        <div className=" md:text-red-900 md:hover:text-purple-600" key={index}>
                            {/* <RainbowDetails key={rainbow._id} rainbow={rainbow} /> */}
                            {rainbow.totalEntries}
                        </div>

                    ))}</div>
                </div>
            </div>
        </>
    )
}