// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";

// function DataPost () {

//     const [number, setNumber] = useState(0)
//     const [error, setError] = useState(null)

//     // const [inverseNum, setInverseNum] = useState('')
//     // useEffect(() => {
//     //     const invert = 10 - number
//     //     setInverseNum(invert)
//     //     console.log(invert)
//     // },[number])

//     const handleSubmit = async () => {

//         // const rainbow = {number}
//         // const inverseRainbow = {inverseNum}

//         //fetch req to post new dats
//         const response = await fetch('api/memos', {
//             method: 'POST',
//             body: JSON.stringify(memo),                          // have to send number as json, not object
//             // body: JSON.stringify(inverseRainbow),                          // have to send number as json, not object
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }) 
//         const json = await response.json()

//         if (!response.ok) {
//             setError(json.error)
//             console.log(error)
//         }
//         if (response.ok) {
//             setNumber('')
//             setError(null)
//             console.log('new number added', json)
//         }
//     }

//     return(
// <>

// <div className="text-red-400">
//     <Button variant="outline-primary" value={number} type="number" onClick={handleSubmit}>8</Button>
//     {/* {error && {error}} */}
//     {/* <Button variant="outline-dark">set to 1</Button> */}



// </div>

// </>
//     )
// }

// export default DataPost;