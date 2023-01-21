import React from "react";

function RainbowGet({ rainbow }) {
    return (
        <>
            {rainbow && rainbow.map((rainbow, index1) => (

                <div className=" text-green-400 md:hover:text-yellow-200" key={index1}>
                    {/* <RainbowDetails key={rainbow._id} rainbow={rainbow} /> */}

                    {parseFloat(rainbow.avgPrice).toFixed(2)}
                </div>

            ))}

        </>
    )
}

export default RainbowGet;