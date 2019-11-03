import React, {useState, useEffect, useRef} from 'react';
import './computer.css';
import PropTypes from 'prop-types';
import bg_1 from '../../assets/bg/Background_1.png';
import Screen from '../Screen/Screen';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import story from '../../assets/story/story';
import {Howl, Howler} from 'howler';

export default function Computer(props){
    const [chapter, setChapter] = useState("0");
    const [showButtons, toggleButtons] = useState(false);
    const [skipTo, setSkipTo] = useState('');
    const skipEl = useRef(null);
    
    useEffect( () => {
        console.log('new chapter:', chapter);
        toggleButtons(false);
    },[chapter])

    return(
        <React.Fragment>
            <div>
                <label htmlFor='chapter'>Go To:</label>
                {/* <input name='chapter' type="number" min={0} step={1} ref={skipEl}></input> */}
                <input name='chapter' type="text" ref={skipEl}></input>
                <button onClick={()=>{setChapter(skipEl.current.value)}}>Go</button>
            </div>
            <div className='computer'>
                <ButtonGroup chapter={chapter} setChapter={setChapter} showButtons={showButtons} />
                <div className='screen__bg'>
                    <Screen chapter={chapter} toggleButtons={toggleButtons}/>
                </div>
                <img className='computer__bg' src={bg_1} alt='computer monitor' />
            </div>
        </React.Fragment>
    )
}

// Computer.PropTypes = {
    
// }