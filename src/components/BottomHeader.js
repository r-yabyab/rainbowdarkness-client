import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'

export function BottomHeader () {


return(
    <>
        {/* mainContainer */}
        <div draggable="false" className='overflow-hidden bg-gray-300 fixed bottom-0 w-full text-[12px] pl-10 select-none'>
            {/* mainUL */}
            <div className='text-center'>
                {/* <div className='text-gray-500'>Powered by Node, React, Express, MongoDB</div> */}
            <div className="tracking-tighter text-gray-500">© 2023 All Rights Reserved.</div>

            </div>

        </div>
    </>
)}
