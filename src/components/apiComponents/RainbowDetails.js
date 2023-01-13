import React from "react";

function RainbowDetails ({ rainbow }) {

    let arr = [1,2,3,23,23,2]
    // const total = rainbow.reduce()

    let rainbow1 = rainbow.number
    // let sum1 = rainbow1.reduce((a,b) => a+b)

     const sum = arr.reduce((a,b) => a+b)
     const div = Math.floor(sum / 2)


    return(
        <>
        <div className="text-red-500 text-sm">
            {/* {rainbow.number} 
            {/* {sum}
            {div} */}
            {/* {Math.abs(rainbow1/2)} */}
        </div>
        
        </>
    )
}

export default RainbowDetails