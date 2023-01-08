import React, { Component } from 'react';


class DarkLight extends Component {

    constructor(props) {
        super(props)
        this.state = {isToggleOn: true};
        // this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState(prevState => ({
           isToggleOn: !prevState.isToggleOn
        }));
    }

        render() {
            return (
                <div>
                    <div></div>
                    <button onClick={() => this.handleClick()}>
                    {this.state.isToggleOn ? 'Dark' : 'Light'}
                    </button>
                </div>
            )
        }
    }


// class Moodrating extends Component {
//     render() {
//         return(
//             <button className='Moodrating'>
//                 {/* todo */}
//             </button>
//         )
//     }

// }

export default DarkLight;