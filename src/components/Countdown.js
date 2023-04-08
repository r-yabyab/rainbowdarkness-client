// import React, { useEffect, useReducer } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { bindActionCreators } from "redux";
// import { actionCreators } from "../state";
// import { setStaticTime } from "../state/action-creators";

// function Countdown () {

//     const staticTime = useSelector((state) => state.staticTime)
//     const destroyer = useSelector((state) => state.destroyer)
//     const dispatch = useDispatch()
//     const { setStaticTime } = bindActionCreators(actionCreators, dispatch)

//     const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

//     useEffect(() => {
//         // console.log(destroyer,'localstore')
//         window.localStorage.setItem('_APP', JSON.stringify(destroyer))
//         window.localStorage.setItem('_APP_timer', JSON.stringify(staticTime))
//         setTimeout(() => {
//             forceUpdate()
//         },100)

//     },[destroyer, staticTime])

//     return (
//         <>
//         <div>
//             countdown
//             countdown
//             countdown
//             countdown
//             countdown
//         </div>
//         </>
//     )
// }

// export default Countdown;