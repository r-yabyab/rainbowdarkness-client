import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function ButtonJs () {
    
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const [num, setNum] = useState(0)

const inc1 = (id) => {
     console.log(`key: ${id}`)
    }

const listNumbers = numbers.map(number => {
    return(
        <div key={number.id}>
        {number}
        </div>
    )
})

const increment1 = () => {
    setNum(num => num +1)
}

const console1 = () => {
    console.log("clicked")
}

    return(
        <>
            <div className="text-center mt-40">

                <div className="mb-10">
                    <Button variant='dark'>{num}</Button>
                    <Button onClick={() => setNum(num => num + 1)} variant='success'>Increment</Button>
                    <Button onClick={() => setNum(num => num - 1)} variant='danger'>Decrement</Button>


                    <Button onClick={increment1} variant='success'>Fx Inc</Button>
                    <Button onClick={() => setNum(num => num - 1)} variant='danger'>Fx Dec</Button>
                </div>

<div className="flex-row flex [&>*]:ml-10 [&>*]:cursor-pointer">

{numbers.map((x) => {
    return(
<><div key={x.toString()}>
<Button onClick={() => inc1(x.toString())} variant='success'>+1 List</Button>
    {x}</div>
</>
    )
 })}




{/* {listNumbers} */}

<Button onClick={() => inc1} variant='success'>+1 List</Button>


 <div className="mt-10">penis</div>
</div>

            </div>
        </>  
    )
}