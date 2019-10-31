import React, {useState, useEffect} from 'react';
import { isArray } from 'util';
import textLogo from '../../assets/ascii/logo';
import story from '../../assets/story/story';
import propTypes from 'prop-types';
import {Howl} from 'howler';

//Import all the music
import Angel_of_Mercy from '../../assets/music/Angel_of_Mercy.mp3';
import Faceoff from '../../assets/music/Faceoff.mp3';
import Arcade from '../../assets/music/Arcade.mp3';
import Choose_Your_Path from '../../assets/music/Choose_Your_Path.mp3';
import Dark_Times from '../../assets/music/Dark_Times.mp3';
import Echoes_of_Time_v2 from '../../assets/music/Echoes_of_Time_v2.mp3';
import Echoes_of_Time from '../../assets/music/Echoes_of_Time.mp3';
import Plato_s_Cave from '../../assets/music/Plato_s_Cave.mp3';
import The_Deal_is_Going_Down from '../../assets/music/The_Deal_is_Going_Down.mp3';

//Import SFX (as needed)
import sos_mayday from '../../assets/sfx/morse/mp3/daytripper-sos-mayday.mp3';
import stations from '../../assets/sfx/morse/mp3/kwahmah-stations-broadcasting_noise-reduced.mp3';
import wps30 from '../../assets/sfx/morse/mp3/morse-30wps.mp3';
import telecom from '../../assets/sfx/morse/mp3/timbre_telecom_heavily_edited.mp3';
import transmission from '../../assets/sfx/morse/mp3/trebblofang__creepy_background_transmission.mp3';
import pi from '../../assets/sfx/morse/mp3/trebblofang_pi1000digits.mp3';


export default function Story(props){
const [text, setText] = useState([]);
const [music, setMusic] = useState(null);

// set up text to print, each item in array is new line
var textArray = story[props.chapter].textArray;

useEffect( () => {
    console.log('<Story /> Initial Render');
    //Start displaying the text
    typewriter(textArray);

    //Play bg music
    console.log(story[props.chapter].music);
    if(story[props.chapter].music){
        console.log('try')
        let bgMusic = new Howl({
            src: ['faceoff.mp3'],
            // src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
        })

        bgMusic.play();
    }
},[])

// Functions
let Music = {
    'Angel_of_Mercy': Angel_of_Mercy,
    'Faceoff': Faceoff,
    'Arcade': Arcade,
    'Choose_Your_Path':Choose_Your_Path,
    'Dark_Times':Dark_Times,
    'Echoes_of_Time': Echoes_of_Time,
    'Echoes_of_Time_v2': Echoes_of_Time_v2,
    'Plato_s_Cave': Plato_s_Cave,
    'The_Deal_is_Going_Down': The_Deal_is_Going_Down
}

let SFX = {
    'sos_mayday': sos_mayday,
    'stations': stations,
    'wps30': wps30,
    'telecom': telecom,
    'transmission': transmission,
    'pi': pi,
}

var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = textArray[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
    
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

const typewriter = (textArray) => {

    sContents = [''];
    iRow = Math.max(0, iIndex - iScrollAt);

    while (iRow < iIndex) {
        sContents[iIndex] += textArray[iRow++];
        sContents[iIndex] = '';
    }
    setText((text) => {
        text[iIndex] = <p key={`line-${iIndex}`}>{sContents[iIndex] + textArray[iIndex].substring(0, iTextPos)}<span className='caret'></span></p>;
        return [...text];
    });

    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != textArray.length) {
            setTimeout(() => {
                //Clear carat from previous line
                setText((text) => {
                    text[iIndex-1] = <p key={`line-${iIndex-1}`}>{sContents[iIndex-1] + textArray[iIndex-1].substring(0, iArrLength)}</p>;
                    text[iIndex] = <p key={`line-${iIndex}`}><span className='caret'></span></p>
                    return [...text];
                });
                //Write next line
                iArrLength = textArray[iIndex].length; //Next line's length
                typewriter(textArray)
            }, 1500);
        }else{
            //Make last line carat blink
            setText((text) => {
                text[iIndex-1] = <p key={`line-${iIndex-1}`}>{sContents[iIndex-1] + textArray[iIndex-1].substring(0, iArrLength)}<span className='caret blink'></span></p>;
                return [...text];
            });
            //Show the buttons after a delay
            setTimeout( () => {
                props.toggleButtons(true)
            }, 750);
        }
    } else {
        setTimeout(() => typewriter(textArray), iSpeed);
    }
}

    let lines = text.map( (line,index) => {
        return line
    })


    return(
        <React.Fragment>
            {lines}
        </React.Fragment>
    )
}

Story.propTypes = {
    chapter: propTypes.number.isRequired,
    toggleButtons: propTypes.func.isRequired,  
}