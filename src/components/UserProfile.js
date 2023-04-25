import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import format from "date-fns/format";

export function UserProfile() {

    const { user } = useAuth0()

    const getDatafromLS = () => {
        const moogleData = localStorage.getItem('_APP_moogle');
        if (moogleData) {
            return JSON.parse(moogleData)
        } else {
            return []
        }
    }

    const books = getDatafromLS()

    const buttonHandler1 = () => {
        console.log('test')
        const localNums = books && books.reverse().map(x => x.inputNumber + '-' + x.inputTime)
        console.log(localNums)
    }

    const [allNums, setAllNums] = useState([])

    useEffect(() => {
        const fetchAllNums = async () => {
            try {
                const response = await fetch('https://rainbowdarkness-server.vercel.app/api/rainbows/last')
                const json = await response.json()
                if (response.ok) {
                    setAllNums(json)                
                }
            }
            catch (error) {
                console.error(error.message)
            }
        }
        fetchAllNums()
    }, [])

    return (
        <>
            <div className="text-white relative">
                <div className="text-white">Settings</div>

                <div className="[&>div]:flex">
                    <div>
                        <div>Email</div>
                        <div>{user && user.email}</div>
                    </div>
                    <div>
                        <div>Username:</div>
                        <div>...</div>
                    </div>
                </div>

                <div className=" bg-blue-200 ml-4 mr-4 p-4 text-black">
                    <div className="">Export Local Storage to Database</div>
                    <div>You have x numbers on your browser's local storage, would you like to store them in the database?</div>
                    <button
                        onClick={buttonHandler1}
                        className="bg-white hover:cursor-pointer">
                        Click to see #s you can export
                    </button>
                    <div className="text-white bg-black flex flex-col gap-x-2 overflow-scroll">
                        {allNums && allNums
                        .map((x, index) => {

                            const backgroundColor = index % 2 === 0 ? 'bg-black' : 'bg-zinc-500'
                            const matched = books && books.some(book => {
                                // return (book.inputNumber === x.number) && ((new Date(book.inputTime), 'MM/dd') === (new Date(x.createdAt), 'MM/dd'))})
                                return (book.inputNumber === x.number) && ((book.inputTime) === format(new Date(x.createdAt), 'MM/dd'))})
                            

                            return (
                                <div 
                                    className={`${backgroundColor}`}
                                    key={index}>
                                    {`Num:${x.number} _id:${x._id} Date:${format(new Date(x.createdAt), 'MM/dd')} ${x.userID && x.userID ? x.userID : ''}`}
                                {matched ? <span className="bg-green-500">{x.number}</span> : <span className="bg-red-500">{x.number}</span>}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="text-white bg-zinc-700 flex flex-wrap gap-2">
                    {books && books.map((x, index) => {
                        const backgroundColor = index % 2 === 0 ? 'bg-zinc-700' : 'bg-zinc-900'
                        
                        return(
                        <div
                            className={backgroundColor}
                            key={index}>
                            {`Num:${x.inputNumber} + Date:${x.inputTime}`}
                        </div>
                        )
                    })}
                </div>
                <div className="mb-20">testestestest</div>

            </div>
        </>
    )
}