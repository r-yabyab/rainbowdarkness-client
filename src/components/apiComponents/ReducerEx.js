// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLastAll } from "../../state/reducers/thunk-reducers/fetchLastReducer";

// export function ReducerEx() {

//     const recentNums = useSelector((state) => state.rainbowLastAll)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(fetchLastAll())
//     }, [])

//     return (<>
//         <div className="bg-white absolute left-10 top-0 text-black">
//             {!recentNums.loading && recentNums.rainbow.map((x, index) => (
//                 <div className="bg-white" key={index}>
//                     <div>{x.number}DATA</div>
//                     </div>
//             ))}
//             {recentNums.loading && <div>LOADING</div>}
//             test
//         </div>
//     </>)
// }