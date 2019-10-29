import React, {useState, useEffect} from 'react';
import './computer.css';
import PropTypes from 'prop-types';
import bg_1 from '../../assets/bg/Background_1.png';

import Screen from '../Screen/Screen';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import story from '../../assets/story/story';

export default function Computer(props){
    const [chapter, setChapter] = useState(0);
    const [showButtons, toggleButtons] = useState(false);
    
    useEffect( () => {
        toggleButtons(false);
    },[chapter])

    return(
        <div className='computer'>
            <ButtonGroup chapter={chapter} setChapter={setChapter} showButtons={showButtons} />
            <div className='screen__bg'>
                <Screen chapter={chapter} toggleButtons={toggleButtons}/>
            </div>
            <img className='computer__bg' src={bg_1} alt='computer monitor' />
        </div>
    )
}

// Computer.PropTypes = {
    
// }