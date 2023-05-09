import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import format from "date-fns/format";

export function PutSubmission ({ RAINBOW_DARKNESS, books }) {

    const { user, isAuthenticated } = useAuth0()



    const [yourRecent, setYourRecent] = useState('')


    useEffect(() => {
        const yourSub = user && user.sub
        console.log(yourSub)

        if (isAuthenticated) {
            const fetchRecent = async () => {
                const data = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
                const json = await data.json()

                if (data.ok) {
                    const dataShit = json
                    // const dataArr = dataShit.map(x => x)
                    const firstInstance = dataShit.findIndex(item => item.userID === yourSub)
                    const matchedInstance = dataShit[firstInstance]

                    // console.log(matchedInstance, 'matched')
                    // console.log(dataShit)
                    // console.log(firstInstance + 'test')
                    setYourRecent(matchedInstance)
                }
            }
            fetchRecent()
        }
        else {
            const fetchRecentLocal = async () => {
                const data = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/last`)
                const json = await data.json()

                if (data.ok) {
                    const dataShitLocal = json
                    const bookSort = books.reverse()
                    const firstInstanceLocal = dataShitLocal.findIndex(item => item._id === bookSort[0].objId)
                    const matchedInstance = dataShitLocal[firstInstanceLocal]
                    // console.log(firstInstanceLocal, 'FIRST INSTANCE')
                    // console.log(bookSort[0].objId)
                    // console.log(dataShitLocal)
                    setYourRecent(matchedInstance)
                }
            }
            fetchRecentLocal()
        }
    }, [isAuthenticated])

    const [submittedInfo, setSubmittedInfo] = useState([])

    const handleMemoSubmit = async () => {
        const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/details/${yourRecent._id}?id=${yourRecent._id}&sleepNumber=${sleepNumber}&activities=${activities}&memoText=${memoText}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
        const json = await response.json()
        if (response.ok) {
            console.log('SUBMITTED TO DB!', json)
        }
    } 

    const [sleepNumber, setSleepNumber] = useState('')
    const [activities, setActivities] = useState('')
    const [memoText, setMemoText] = useState('')
    const [memoError, setMemoError] = useState(false)

    const handleMemoChange = (e) => {
        setMemoText(e.target.value)
    }

    const handleSleepChange = (e) => {
        setSleepNumber(e.target.value)
    }

    const activitiesChange = (e) => {
        setActivities(e.target.value)
    }
            // Not everything needs to be added
            const handleSubmit = (e) => {
                e.preventDefault();
                if (memoText.length >= 1 || (parseFloat(sleepNumber) >= 0 && parseFloat(sleepNumber) <= 24) || activities.length >= 1) 
            {
                console.log('sleep', sleepNumber, "activities", activities, "memo", memoText)

                handleMemoSubmit()

                setMemoText('')
                setActivities('')
                setSleepNumber('')
            } else {
                console.log('PUT MEMO')
                setMemoError(true)
                setTimeout(() => {
                    setMemoError(false)
                }, 1000)
            }
            }

    return(
        <>
            <div className={`relative flex mb-8  flex-col [&>div>div]:text-left bg-blue-300 rounded-md [&>div>div]:pl-10 [&>div>div]:pr-10 pb-20 w-full`}>
                <div className="pt-2 mb-4 font-bold bg-blue-200 pb-2 rounded-t-md">Submission Info (beta)</div>
                <div>
                    <div>Mood: {yourRecent.number}</div>
                    <div className="mb-4">Date: {yourRecent && format(new Date(yourRecent.createdAt), 'EEEE, MMM do HH:mm')}</div>
                    <div>Include more information (optional)</div>
                    <div 
                        // className={`${memoError ? 'bg-red-400' : ''}`}
                        >
                        <div className="mt-2">
                            <form>
                                <input
                                    className={`${memoError ? 'placeholder-red-400' : ''}`}
                                    placeholder="Hours slept"
                                    type="number"
                                    value={sleepNumber}
                                    onChange={handleSleepChange}
                                />
                            </form>
                        </div>
                        <div className="mt-2">
                            <form>
                                <input
                                    className={`${memoError ? 'placeholder-red-400' : ''}`}
                                    placeholder="Activities"
                                    type="text"
                                    value={activities}
                                    onChange={activitiesChange}
                                />
                            </form>
                        </div>
                        <div className="mt-2">
                            <form>
                                <textarea
                                    className={`${memoError ? 'placeholder-red-400' : ''}`}
                                    type="text"
                                    placeholder="Memo"
                                    value={memoText}
                                    onChange={handleMemoChange}
                                />
                            </form>

                        </div>
                    </div>
                </div>
                <button
                            className={`${memoError ? 'bg-red-400' : 'hover:bg-blue-500 bg-blue-400 text-zinc-900 hover:text-zinc-100'} left-[50%] -translate-x-1/2 absolute bottom-0   p-2 mt-4 mb-4  rounded-md w-[85%]`}
                            onClick={handleSubmit}
                        > {memoError ? 'INPUT AT LEAST 1 FIELD' :'SUBMIT'}</button>
            </div>
        </>
    )
}