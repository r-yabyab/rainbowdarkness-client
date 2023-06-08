import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const getDatafromLS = () => {
    const moogleData = localStorage.getItem('_APP_moogle');
    if (moogleData) {
        return JSON.parse(moogleData)
    } else {
        return []
    }
}

// const RAINBOW_DARKNESS = 'https://stockshapes.net/rainbowdarkness' 

export function HomeChartHolder () {

    const books = getDatafromLS()
    
    // redux
    const destroyer = useSelector((state) => state.destroyer)

    const [data, setData] = useState([])
    const [date, setDate] = useState([])

    useEffect(() => {
            console.log(books[0].inputNumber)
            setData(books[0].inputNumber)
            setDate(books[0].inputTime)
        // else 
        // {
        //     const fetchUserData = async () => {
        //         const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/lastnumuser?sub=${user.sub}`)
        //         const json = await response.json()

        //         if (response.ok) {
        //             setData(json[0])
        //         }
        //     }
        //     fetchUserData()
        // }
    }, [destroyer])

    return (
        <>
                <div className='  h-[290px]  lg:w-[900px] md:w-[700px] 
                         mr-auto ml-auto
                         max-md:w-[360px]  bg-zinc-100 rounded-md  text-zinc-900'>
                    <div className="pt-2 font-bold bg-zinc-400 text-center pb-2 rounded-t-md">{date && date} Submission </div>
                    <div className='ml-8'>
                    <div className=' justify-center  align-middle py-3 text-left'>
                        Mood: {data && data}
                    </div>
                    <div>
                        <div className=''>Please come back tomorrow!</div>
                    </div>
                    </div>
                    {/* <div className='animate-pulse py-2 font-thin'></div> */}
            </div>
        </>
    )
}