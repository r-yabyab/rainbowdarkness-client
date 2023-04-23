import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
        const localNums = books && books.map(x => x.inputNumber + '-' + x.inputTime)
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
                    <div>penis</div>
                    <div>penis</div>
                    <div>penis</div>
                </div>

                <div className=" bg-blue-200 ml-4 mr-4 p-4 text-black">
                    <div className="">Export Local Storage to Database</div>
                    <div>You have x numbers on your browser's local storage, would you like to store them in the database?</div>
                    <button
                        onClick={buttonHandler1}
                        className="bg-white hover:cursor-pointer">
                        Click to see #s you can export
                    </button>
                    <div className="text-white bg-black flex flex-wrap gap-2">
                        {allNums && allNums
                        .reverse()
                        .map((x, index) => {
                            return (
                                <div key={index}>
                                    {`Num:${x.number} Date${x.createdAt}`}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}