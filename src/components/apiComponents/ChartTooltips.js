import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function ChartTooltips () {

    // redux
    const tooltipContent = useSelector((state) => state.tooltipContent)


    return (
        <>
            <div className='bg-zinc-100 rounded-md  text-zinc-900'>
            <div className="pt-2 font-bold bg-zinc-400 pb-2 rounded-t-md">Chart Info </div>

                    {
                        tooltipContent.mood ?
                        <div className='px-2 py-3 text-left ml-8'>
                            <div className=' font-bold'>{tooltipContent.date}</div>
                            <div><span className=' font-bold'>Mood:</span> {tooltipContent.mood}</div>
                            <div>{tooltipContent.sleep && "Time slept: " + tooltipContent.sleep}</div>
                            <div>{tooltipContent.activities && "Activities: " + tooltipContent.activities}</div>
                            <div>{tooltipContent.memo && "Memo: " + tooltipContent.memo}</div>
                        </div> :
                        <div className='animate-pulse py-2 font-thin'>Hover over chart (need more than 1 submission)</div>
                    }
            </div>
        </>
    )
}