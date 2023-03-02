import React from "react";

function RainbowGet({ rainbow }) {
    return (
        <>
            {rainbow && rainbow.map((rainbow, index1) => (

                // <div className=" text-green-400 md:hover:text-yellow-200 ratingAnimationYellow" key={index1}>
                <div className=" text-green-400 ratingAnimationYellow" key={index1}>
                    {/* <RainbowDetails key={rainbow._id} rainbow={rainbow} /> */}

                    {parseFloat(rainbow.avgPrice).toFixed(2)}
                    {/* {rainbow.documentCount} */}
                    
                </div>

            ))}

        </>
    )
}

export default RainbowGet;