// // import { render } from '@testing-library/react'
// import React from 'react'
// // , { Component, useState } 

// import '../App.css';

// function Square (props) {
//     return(
//         <div>
//             <button className="squares btn btn-outline-primary" onClick={props.onClick}>
//                 {props.value}
//             </button>
//         </div>
//     )
// }

// //https://beta.reactjs.org/learn/updating-arrays-in-state
// //approach
// // let initialNumbers = [
// //     {id: 0, type: '0'},
// //     {id: 1, type: '1'},
// //     {id: 2, type: '2'},
// //     {id: 3, type: '3'},
// //     {id: 4, type: '4'},
// //     {id: 5, type: '5'},
// //     {id: 6, type: '6'},
// //     {id: 7, type: '7'},
// //     {id: 8, type: '8'},
// //     {id: 9, type: '9'},
// //     {id: 10, type: '10'},
// // ]


// // class MoodRating extends React.Component {
// //     constructor (props) {
// //         super (props)
// //         this.state = {
// //             squares = 
// //         }
// //     }
// // }


// //tictactoe approach
// class MoodRating extends React.Component {

//     constructor (props) {
//         super(props)
//         this.state = {
//             squares : Array(11).fill(null),
//             // nextSquare : true,
//         };
//         }
    

//     handleClick(i) {
//         const squares = this.state.squares.slice();
//         if (squares[i]) {
//             return;
//         }
//         squares[i] = true && '1'
//         this.setState({
//             squares:squares,         //WORKS
//             // squares: true

//             // nextSquare: !this.state.nextSquare
//         });
//     }

// //TODO:
// //when click, make the clicked square the only rendered square
//     //assign true or false to squares clicked maybe
    
//     renderSquare(i) {
//         return (
//                 <Square 
//                 // value = {i}
//                 value = {this.state.squares[i]}
//                 onClick = {() => this.handleClick(i)} 
//                 />
//         );
//     }



//     render () {
//         return(
//             <div className='rating'>
//                 {this.renderSquare(0)}
//                 {this.renderSquare(1)}
//                 {this.renderSquare(2)}
//                 {this.renderSquare(3)}
//                 {this.renderSquare(4)}
//                 {this.renderSquare(5)}
//                 {this.renderSquare(6)}
//                 {this.renderSquare(7)}
//                 {this.renderSquare(8)}
//                 {this.renderSquare(9)}
//                 {this.renderSquare(10)}
//             </div>
//         );
//     }
// }

// export default MoodRating;