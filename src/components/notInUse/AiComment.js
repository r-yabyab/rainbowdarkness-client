// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'
// const RAINBOW_DARKNESS = 'http://localhost:4000'


// function AiComment () {
      
//   const [aiText, setAiText] = useState('')

//   useEffect(() => {
//     const aiFetch = async () => {
//       try {
//           const response = await axios.get(`${RAINBOW_DARKNESS}/aicomment`, {
//           headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         setAiText(response.data.content)
//         console.log(response.data.content)
//       } catch (error) {
//         console.error(error)
//       }
      
      
//     }
//     aiFetch()
//   }, [])


//     return(
//         <>
//         <div>
// {/* Gives a comment after user submits mood */}
//             <div>{aiText && aiText}</div>

//         </div>

//         </>
//     )
// }

// export default AiComment;