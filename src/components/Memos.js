import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";

function Memos () {

    const { getAccessTokenSilently } = useAuth0();
    
    const handleClick = async () => {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
      };

    const [memo, setMemo] = useState('')
    const [memoData, setMemoData] = useState([])
    const [error, setError] = useState(null)

    const RAINBOW_DARKNESS = 'https://rainbowdarkness-server.vercel.app'

    const handleSubmit = async () => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.post('https://rainbowdarkness-server.vercel.app/api/memos', {
                // body: JSON.stringify(memo),
                // headers: {
                //     'Content-Type': 'application/json'
                memo: memo
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            console.log(response.data)
            setMemo('')
        } catch (error) {
            console.error(error)
            if (error.response && error.response.status === 429) {
                setError('Send again tomorrow!') 
        } else {
            // For other errors, set a generic error message
            setError('An error occurred. Please try again later.')
          }
    }}

    const messageBar = (event) => {
        const setter = event.target.value
        setMemo(setter)
        console.log(memo)
    }

//     useEffect(() => {
//         const fetchMemos = async () => {
//         try {
//             const response = await axios.get('https://rainbowdarkness-server.vercel.app/api/memos/last')
//             if (responsesetMemoData(response.data)
//             console.log(response.data)
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     fetchMemos()
// }, [])


useEffect(() => {
    const fetchLastMemo = async () => {
        const response = await fetch('https://rainbowdarkness-server.vercel.app/api/memos/last')
        const json = await response.json()

        if (response.ok) {
            setMemoData(json)
        }
    }
    fetchLastMemo()
}, [])


    return (
        <>
            <div>
                <div className=" bg-blue-400 absolute text-black">
                    <div>Memos</div>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={messageBar}
                            placeholder="input memo"
                            value={memo}
                            className=""
                        />
                    </form>
                </div>

                <div className="text-white absolute mt-20">
                    <div>Memos Data</div>
                    <div>
                        {memoData && memoData.map((x, index) => {
                            return (
                                <div key={index} className={`${index % 2 === 0 ? 'bg-gray-500' : 'bg-gray-800'} p-2`}>
                                    {x.memo}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="text-red-600 absolute ml-48">
                    {error && error}
                </div>
<button className='absolute text-white bg-blue-400 mt-40' onClick={handleClick}>Get Access Token</button>

            </div>
        </>
    )
}

export default Memos;