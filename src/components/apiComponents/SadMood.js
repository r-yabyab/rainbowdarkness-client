// import React, { useState, useEffect } from "react";

// export function SadMood () {

//     let numberList = [0,1,2,3,4,5,6,7,8,9,10]

//     const [sadNumbers, setSadNumbers] = useState(numberList)


//     const sadHandler = (e) => {
//         let x = parseInt(e.target.getAttribute('selectnums'))
//         setSadNumbers([x])
//     }


//     return (
//         <>
//         <div>
//             <div className="pb-8">How sad are you today?</div>
//             <div className="flex flex-row gap-2 justify-center ">
//                 {sadNumbers.map((x, index) => {
//                     return(
//                     <div 
//                         key={index}
//                         selectnums={x}
//                         onClick={sadHandler}
//                         className="py-2 px-3 rounded-lg border-2 transition-colors hover:border-red-300 border-zinc-100 text-zinc-100 hover:cursor-pointer"
//                     >
//                         {x}
//                     </div>
//                     )
//                 })}
//             </div>

//         </div>
//         </>
//     )
// }