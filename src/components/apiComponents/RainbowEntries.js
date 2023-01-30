import React from "react";

function RainbowEntries({ rainbow }) {
    return (
        <>
            {rainbow && rainbow.map((rainbow, index) => (

                <div className=" text-red-900 md:hover:text-purple-600 ratingAnimationYellow" key={index}>
                    {/* <RainbowDetails key={rainbow._id} rainbow={rainbow} /> */}
                    {rainbow.totalEntries}
                </div>

            ))}
        </>
    )
}

export default RainbowEntries;