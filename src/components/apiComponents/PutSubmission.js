import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import format from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

export function PutSubmission ({ RAINBOW_DARKNESS, books }) {

    const { user, isAuthenticated } = useAuth0()

    //redux stuff
    const dispatch = useDispatch()
    const { setEditSubmissionTrigger } = bindActionCreators(actionCreators, dispatch)
    const editSubmissionTrigger = useSelector((state) => state.editSubmissionTrigger)
    const rainbowLastAll = useSelector((state) => state.rainbowLastAll)

    const [yourRecent, setYourRecent] = useState('')

    const [sleepNumber, setSleepNumber] = useState('')
    const [activities, setActivities] = useState('')
    const [memoText, setMemoText] = useState('')
    const [moodNumber, setMoodNumber] = useState('')
    const [memoError, setMemoError] = useState(false)

    // called Dbl because initially it was for onDoubleClick. It's tied to onClick now to edit fields.
    const [sleepNumberDbl, setSleepNumberDbl] = useState(false)
    const [activitiesDbl, setActivitiesDbl] = useState(false)
    const [memoTextDbl, setMemoTextDbl] = useState(false)
    const [moodNumberDbl, setMoodNumberDbl] = useState(false)
    // const [editSubmissionTrigger, setEditSubmissionTrigger] = useState(false)   // moved to redux store

    useEffect(() => {


        if (isAuthenticated) {

            const yourSub = user && user.sub
            // console.log(yourSub)
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
                    // const bookSort = books.reverse()
                    const bookSort = books.slice(-1)
                    const firstInstanceLocal = dataShitLocal.findIndex(item => item._id === bookSort[0].objId)
                    const matchedInstanceLocal = dataShitLocal[firstInstanceLocal]
                    // console.log(firstInstanceLocal, 'FIRST INSTANCE')
                    // console.log(bookSort[0].objId, 'BOOKSORT NONUSER')
                    // console.log(bookSort, 'LOCAL BOOK SORT')
                    // console.log(dataShitLocal)
                    setYourRecent(matchedInstanceLocal)
                }
            }
            fetchRecentLocal()
        }
        // when user saves an edit, runs this useEffect again
    }, [isAuthenticated, editSubmissionTrigger])

    const [submittedInfo, setSubmittedInfo] = useState([])

    const handleMemoSubmit = async () => {
        const response = await fetch(`${RAINBOW_DARKNESS}/api/rainbows/details/${yourRecent._id}?id=${yourRecent._id}&sleepNumber=${sleepNumber}&activities=${activities}&memoText=${memoText}&moodNumber=${moodNumber}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
        const json = await response.json()
        if (response.ok) {
            console.log('SUBMITTED TO DB!', json)
            setEditSubmissionTrigger(!editSubmissionTrigger)
        }
    } 


    const [sleepNumberError, setSleepNumberError] = useState(false)

    const handleMemoChange = (e) => {
        setMemoText(e.target.value)
    }

    const handleSleepChange = (e) => {
        // setSleepNumber(e.target.value)
        const input = e.target.value;
        const parsedInput = parseFloat(input);
      
        if (input === '' || (!isNaN(parsedInput) && parsedInput >= 0 && parsedInput <= 24 && !input.includes('.') && input[0] !== '0')) {
          setSleepNumber(input);
        } else {
            setSleepNumberError(true)
            setTimeout(() => {
                setSleepNumberError(false)
            },1000)
        }

    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
          e.preventDefault(); // Prevent default behavior when Enter is pressed
        }
        else if (e.key === 'Escape') {
            e.target.blur(); // Blur the active input element when Esc is pressed
          }
      };

    const activitiesChange = (e) => {
        setActivities(e.target.value)
    }

    const handleMoodNumberchange = (e) => {
        // setMoodNumber(e.target.value)

        const input = e.target.value;
        const parsedInput = parseFloat(input);

        if (input === '' || (!isNaN(parsedInput) && parsedInput >= 0 && parsedInput <= 10 &&  input[0] !== '0' && input.length <= 3)) {
            setMoodNumber(input);
          } else {
            console.log('error')
          }
    }
            // Not everything needs to be added
            const handleSubmit = (e) => {
                e.preventDefault();
                // if (memoText.length >= 1 || (parseFloat(sleepNumber) >= 0 && parseFloat(sleepNumber) <= 24) || activities.length >= 1 || (parseFloat(moodNumber) >= 0 && parseFloat(moodNumber) <= 10 )) 
                if (memoText || sleepNumber || activities || moodNumber ) 
            {
                console.log('sleep', sleepNumber, "activities", activities, "memo", memoText)

                handleMemoSubmit()

                setMemoText('')
                setActivities('')
                setSleepNumber('')

                setMemoTextDbl(false)
                setSleepNumberDbl(false)
                setActivitiesDbl(false)
                setMoodNumberDbl(false)
            } else {
                console.log('PUT MEMO')
                setMemoError(true)
                setTimeout(() => {
                    setMemoError(false)
                }, 1000)
            }
            }

    return (
        <>
            <div className={`relative select-none flex mb-8  flex-col [&>div>div]:text-left bg-blue-300 rounded-md [&>div>div]:pl-10 [&>div>div]:pr-10 pb-20 w-full`}>
                <div className="pt-2 mb-4 font-bold bg-blue-200 pb-2 rounded-t-md">Submission Info (Today)</div>
                <div>
                    <div>
                        <div className="flex gap-2 items-center group"
                            onClick={() => {
                                setMoodNumberDbl(true)
                                setMoodNumber(yourRecent.number)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={moodNumberDbl ? '' : "hover:cursor-pointer group-hover:text-yellow-400 text-yellow-500 bi bi-lightning-charge-fill"} viewBox="0 0 16 16">
                                <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                            </svg>
                            <div className={moodNumberDbl ? '' : "underline hover:cursor-pointer"}>Mood:</div>
                            <div

                                className={moodNumberDbl ? 'hidden' : 'hover:cursor-pointer hover:text-blue-600 group-hover:bg-white'}
                            > {yourRecent.number}</div>
                            <form
                                onClick={() => setSleepNumberDbl(false)}
                                className={moodNumberDbl ? '' : 'hidden'}
                            >
                                <input
                                    className={`${memoError ? 'placeholder-red-400' : ''}`}
                                    placeholder="0-10"
                                    type="number"
                                    value={moodNumber}
                                    onChange={handleMoodNumberchange}
                                    onKeyDown={handleKeyDown}
                                />
                            </form>
                        </div>
                    </div>

                    <div className="mb-4">Date: {yourRecent && format(new Date(yourRecent.createdAt), 'EEEE, MMM do HH:mm')}</div>
                    <div className=" font-semibold">Additional Info (optional)</div>
                    <div
                    // className={`${memoError ? 'bg-red-400' : ''}`}
                    >
                        <div className="mt-2">
                            <div className="flex items-center gap-2 group"
                                onClick={() => {
                                    setSleepNumberDbl(true)
                                    setSleepNumber(yourRecent.timeSlept)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={sleepNumberDbl ? '' : "bi bi-stars group-hover:text-yellow-400 hover:cursor-pointer"} viewBox="0 0 16 16">
                                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                                </svg>
                                <div className={sleepNumberDbl ? '' : "underline hover:cursor-pointer"}>Hours Slept:</div>

                                {yourRecent && yourRecent.timeSlept && yourRecent.timeSlept >= 0
                                    ?
                                    <>
                                        <div

                                            className={sleepNumberDbl ? 'hidden' : 'group-hover:cursor-pointer group-hover:bg-white'}
                                        >
                                            {yourRecent.timeSlept}
                                        </div>
                                        <form
                                            onClick={() => setSleepNumberDbl(false)}
                                            className={sleepNumberDbl ? '' : 'hidden'}
                                        >
                                            <input
                                                className={`${memoError ? 'placeholder-red-400' : ''}`}
                                                placeholder="0-24"
                                                type="number"
                                                value={sleepNumber}
                                                onChange={handleSleepChange}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </form>
                                    </>
                                    :
                                    <form>
                                        <input
                                            className={`${memoError ? 'placeholder-red-400' : ''}`}
                                            placeholder="0-24"
                                            type="number"
                                            value={sleepNumber}
                                            onChange={handleSleepChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </form>
                                }
                                {/* <div className="absolute"> {sleepNumberError && sleepNumberError}</div> */}
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-2 items-center group"
                                onClick={() => {
                                    setActivitiesDbl(true)
                                    setActivities(yourRecent.activities)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={activitiesDbl ? '' : "hover:cursor-pointer group-hover:text-yellow-400 bi bi-cup-hot-fill"} viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z" />
                                    <path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z" />
                                </svg>
                                <div className={activitiesDbl ? '' : "underline hover:cursor-pointer"}>Activities: </div>

                                {yourRecent && yourRecent.activities && yourRecent.activities.length > 0
                                    ?
                                    <>
                                        <div

                                            className={activitiesDbl ? 'hidden' : 'hover:cursor-pointer hover:text-blue-600 group-hover:bg-white'}
                                        >
                                            {yourRecent.activities}
                                        </div>
                                        <form
                                            onClick={() => setActivitiesDbl(false)}
                                            className={activitiesDbl ? '' : 'hidden'}
                                        >
                                            <input
                                                className={`${memoError ? 'placeholder-red-400' : ''}`}
                                                placeholder="Activities"
                                                type="text"
                                                value={activities}
                                                onChange={activitiesChange}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </form>
                                    </>
                                    :
                                    <form>
                                        <input
                                            className={`${memoError ? 'placeholder-red-400' : ''}`}
                                            placeholder="Activities"
                                            type="text"
                                            value={activities}
                                            onChange={activitiesChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </form>
                                }
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-wrap items-center gap-2 group"
                                onClick={() => {
                                    setMemoTextDbl(true)
                                    setMemoText(yourRecent.memo)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={memoTextDbl ? '' : "hover:cursor-pointer group-hover:text-yellow-400 bi bi-sticky-fill"} viewBox="0 0 16 16">
                                    <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zm6 8.5a1 1 0 0 1 1-1h4.396a.25.25 0 0 1 .177.427l-5.146 5.146a.25.25 0 0 1-.427-.177V9.5z" />
                                </svg>
                                <div className={memoTextDbl ? '' : "underline hover:cursor-pointer"}>Memo: </div>

                                {yourRecent && yourRecent.memo && yourRecent.memo.length > 0
                                    ?
                                    <>
                                        <div

                                            className={memoTextDbl ? 'hidden' : 'hover:cursor-pointer hover:text-blue-600 group-hover:bg-white'}
                                        >
                                            {yourRecent.memo}
                                        </div>
                                        <form
                                            onClick={() => setMemoTextDbl(false)}
                                            className={memoTextDbl ? '' : 'hidden'}
                                        >
                                            <textarea
                                                className={`${memoError ? 'placeholder-red-400' : ''}`}
                                                type="text"
                                                placeholder="Memo"
                                                value={memoText}
                                                onChange={handleMemoChange}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </form>
                                    </>
                                    :
                                    <form>
                                        <textarea
                                            className={`${memoError ? 'placeholder-red-400' : ''}`}
                                            type="text"
                                            placeholder="Memo"
                                            value={memoText}
                                            onChange={handleMemoChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className={`${memoError ? 'bg-red-400' : 'hover:bg-blue-500 bg-blue-400 text-zinc-900 hover:text-zinc-100'} left-[50%] -translate-x-1/2 absolute bottom-0   p-2 mt-4 mb-4  rounded-md w-[85%]`}
                    onClick={handleSubmit}
                > {memoError ? 'INPUT AT LEAST 1 FIELD' : 'SAVE'}</button>
            </div>
        </>
    )
}