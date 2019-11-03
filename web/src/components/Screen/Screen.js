import React, {useState, useEffect} from 'react';
import './screen.css';
import MainMenu from '../Chapters/MainMenu';
import Story from '../Chapters/Story';
import propTypes from 'prop-types';
 
export default function Screen(props){
    const [text, setText] = useState('');

    // On intial render
    useEffect(() => {
        console.log(props)
    },[])

    //Functions

    if(props.chapter === "0"){
        return(
            <div className='screen'>
                <MainMenu toggleButtons={props.toggleButtons} Howl={props.Howl} />
            </div>
        )
    }
    return(
        <div className='screen'>
            <Story chapter={props.chapter} toggleButtons={props.toggleButtons} Howl={props.Howl} />
        </div>
    )
}

Screen.propTypes = {
    toggleButtons: propTypes.func.isRequired,
    chapter: propTypes.number.isRequired,
}

