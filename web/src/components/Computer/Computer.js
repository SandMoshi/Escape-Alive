import React, {useState, useEffect, useRef} from 'react';
import './computer.css';
import bg_1 from '../../assets/bg/Background_1.png';
import Screen from '../Screen/Screen';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import rotatePhoneIcon from '../../assets/icons/phone-position-rotation-from-horizontal-to-vertical.svg';

export default function Computer(props){
    const [chapter, setChapter] = useState("0");
    const [showButtons, toggleButtons] = useState(false);
    const [skip, setSkip] = useState(false);
    // const [showSkip, setShowSkip] = useState(true);
    const skipEl = useRef(null);
    
    useEffect( () => {
        console.log('new chapter:', chapter);
        toggleButtons(false);
    },[chapter])

    const toggleSkip = () => setSkip(!skip);

    return(
        <React.Fragment>
            <div>
                <label htmlFor='chapter'>Go To:</label>
                <input name='chapter' type="text" ref={skipEl}></input>
                <button onClick={()=>{setChapter(skipEl.current.value)}}>Go</button>
            </div>
            <div className='rotatePrompt'>
                <h3>Welcome to Escape ISIS</h3>
                <p>This game must be played in landscape mode</p>
                <img className='rotateIcon' src={rotatePhoneIcon} alt='Rotate Phone to Landscape'/>
                <p>Please rotate your screen</p>
            </div>
            <div className='computer'>
                <ButtonGroup chapter={chapter} setChapter={setChapter} showButtons={showButtons} toggleButtons={toggleButtons} toggleSkip={toggleSkip} skip={skip}/>
                <div className='screen__bg'>
                    <Screen chapter={chapter} toggleButtons={toggleButtons} skip={skip} setSkip={setSkip} />
                </div>
                <img className='computer__bg' src={bg_1} alt='computer monitor' />
            </div>
        </React.Fragment>
    )
}