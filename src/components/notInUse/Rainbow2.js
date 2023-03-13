// import React, { useState } from 'react'
// import { Button } from 'react-bootstrap'

// export function Rainbow2 () {

// const [score, setScore] = useState(0)

// const changerButtons = <>
//                     <Button onClick={() => setScore(score => score + 0.5)} variant='success'>+</Button>
//                     <Button onClick={() => setScore(score => score - 0.5)} variant='danger'>-</Button>
// </>

//     return(
//         <>
// <div className='relative mt-[5em] text-center'>

// <div className='[&>*]:ml-4 first:[&>*]:ml-0'>
//     <Button onClick={() => setScore(1)} variant='outline-primary'>1</Button>
//     <Button onClick={() => setScore(2)} variant='outline-primary'>2</Button>
//     <Button onClick={() => setScore(3)} variant='outline-primary'>3</Button>
//     <Button onClick={() => setScore(4)} variant='outline-primary'>4</Button>
//     <Button onClick={() => setScore(5)} variant='outline-primary'>5</Button>
//     <Button onClick={() => setScore(6)} variant='outline-primary'>6</Button>
//     <Button onClick={() => setScore(7)} variant='outline-primary'>7</Button>
//     <Button onClick={() => setScore(8)} variant='outline-primary'>8</Button>
//     <Button onClick={() => setScore(9)} variant='outline-primary'>9</Button>
//     <Button onClick={() => setScore(10)} variant='outline-primary'>10</Button>
// </div>

// {changerButtons}

// <Button className='mt-10' variant='dark'>{score}</Button>

// </div>

//         </>
//     )
// }