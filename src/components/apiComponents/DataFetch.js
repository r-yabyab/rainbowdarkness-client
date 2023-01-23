import React, { Suspense, useEffect, useState } from "react";
import Loader from "./Loader";
const RainbowEntries = React.lazy (() => import("./RainbowEntries")) ;
const RainbowGet = React.lazy(() => import("./RainbowAvgScore"));
// import RainbowDetails from "./RainbowDetails";


function DataFetch ({reducerValue, destroyer, books}) {

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

    return (
        <>

            {/* fixed containers */}
            <div className="md:hidden">
                <div className="
                fixed bottom-[100px] mt-[5em] p-4 select-none text-xl rounded-3xl left-[70px] shadow-red-700 shadow-2xl bg-blue-300  from-fuchsia-800
                md:hover:bg-[#C4B5FD]
                max-md:bottom-0 max-md:mb-4 max-md:left-[50%] max-md:-translate-x-1/2 max-md:w-full max-md:rounded-none max-md:text-center max-md:bg-[#2563EB] max-md:text-[#0a0802]
                ">
                    <p className="font-bold">Global Score</p>
                    {/* <p>Daily: <span className="opacity-40">[WIP]</span></p> */}

                    <div className={destroyer ? "ratingAnimationYellow md:bg-black max-md:shadow-white max-md:shadow-inner md:text-slate-100 md:text-center" : "md:bg-black max-md:shadow-white max-md:shadow-inner md:text-slate-100 md:text-center"}>
                        <div>Avg Score
                            <Suspense fallback={<Loader />}>
                                <RainbowGet rainbow={rainbow} destroyer={destroyer} />
                            </Suspense>
                        </div>
                        <div> Entries
                            <Suspense fallback={<Loader />}>
                                <RainbowEntries rainbow={rainbow} destroyer={destroyer} />
                            </Suspense>
                        </div>
                    </div>
                </div>


                <div className="
                fixed bottom-[100px] mt-[5em] p-4 select-none text-xl rounded-3xl right-[70px] shadow-red-700 shadow-2xl bg-blue-300 md:hover:bg-[#C4B5FD] from-fuchsia-800
                max-md:bottom-0 max-md:mb-4 max-md:-right-[106px] max-md:-translate-x-1/2 max-md:rounded-none max-md:text-center max-md:bg-black max-md:text-[#2563EB]
                max-md:h-[204px]">
                    <p className="font-bold">Your score</p>
                    <div className=' bg-black text-white'>{books.map((book, index1) => (
                        <div key={index1} className=" space-x-2 flex">
                            <p className="max-md:text-sm">{book.inputTime}:</p>
                            <p className='font-bold ratingAnimationYellow border-green-500 pl-4 pr-4 pt-2 pb-2 border-2 text-green-400
                        max-md:p-2'>{book.inputNumber}</p>
                        </div>))}
                    </div>

                </div>
            </div>


{/* Absolute desktop containers */}
            <div className="relative pt-[80px] pr-[100px] pl-[100px] max-w-[1000px] mr-auto ml-auto mb-[200px]
            max-md:hidden">
                ___________________________________________________________________________________
                <div className="pt-[80px]">
                <div className="absolute right-0 w-[240px] mr-12">
                    <span className="font-bold">Global Score</span>
                    <div className=" md:bg-black p-3 mt-3 bg-white max-md:shadow-white max-md:shadow-inner md:text-slate-00 md:text-center">
                        <div>Avg Score
                            <Suspense fallback={<Loader />}>
                                <RainbowGet rainbow={rainbow} />
                            </Suspense>
                        </div>
                        <div> Entries
                            <Suspense fallback={<Loader />}>
                                <RainbowEntries rainbow={rainbow} />
                            </Suspense>
                        </div>
                    </div>
                </div>


                <div className="absolute left-0 ml-12">
                    <p className="font-bold">Your Score</p>
                    <div className=' [&>div]:border-0 bg-white [&>div]:justify-center w-[240px] p-3'>{books.map((book, index1) => (
                        <div key={index1} className=" space-x-2 flex">
                            <p className="max-md:text-sm">{book.inputTime}: &nbsp; <span className="font-bold ratingAnimationWhite border-green-500 text-green-400">{book.inputNumber}</span></p>
                        </div>))}
                    </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default DataFetch;