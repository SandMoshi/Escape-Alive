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

//Import all SFX
import sos_mayday from '../../assets/sfx/morse/mp3/daytripper-sos-mayday.mp3';
import stations from '../../assets/sfx/morse/mp3/kwahmah-stations-broadcasting_noise-reduced.mp3';
import wps30 from '../../assets/sfx/morse/mp3/morse-30wps.mp3';
import telecom from '../../assets/sfx/morse/mp3/timbre_telecom_heavily_edited.mp3';
import transmission from '../../assets/sfx/morse/mp3/trebblofang__creepy_background_transmission.mp3';
import pi from '../../assets/sfx/morse/mp3/trebblofang_pi_short.mp3'; 
import * as images from '../../assets/ascii/images';


export default function Story(props){
    const [text, setText] = useState([]);
    const [music, setMusic] = useState(null);
    const [morseSFX, setMorseSFX] = useState(null); //The SFX file name to play
    const [SFXon, setSFXon] = useState(false); //Determines if SFX is on/off
    const [lastIntervalID, setLastIntervalID] = useState(null);
    const [imageContent, setImageContent] = useState(null);

    // set up text to print, each item in array is new line
    // const [textArray, setTextArray] = useState(story[props.chapter].textArray);
    var textArray = story[props.chapter].textArray;
    var timeouts = [];
    var stopTyping;

    //On Initial Load
    useEffect( () => {
        console.log('<Story /> Initial Render');

        let SFX = setupSFX();
        //Play bg music
        let bgMusic = null;
        if(story[props.chapter].music){
            bgMusic = playBackgroundMusic();
        }

        //Unmounting
        return () => {
            SFX.stop();
            bgMusic.stop();
        }
        
    },[])

    //New chapter
    useEffect(() =>{
        setImageContent(null);
        setText([]);//clear text
        clearInterval(lastIntervalID); //stop any previous typing
        props.setSkip(false);
        if(!story[props.chapter].textArray && story[props.chapter].imagePath){
            drawImage();
        }else{
            let intervalID = newTypewriter();//start typing new chapter
            setLastIntervalID(intervalID); //keep track of this typer
        }
    },[props.chapter])

    // Start/Stop SFX
    useEffect(() => {
        if(!morseSFX){
            console.log('morseSFX:', morseSFX);
            return;
        }
        if(SFXon === true){
            morseSFX.play();
        }else{
            morseSFX.stop();
        }
    },[SFXon])

    //Listen for Skipping
    useEffect( () => {
        console.log('skip', props.skip);
        if(props.skip !== true){
            return;
        }
        else if(!story[props.chapter].textArray && story[props.chapter].imagePath){
            return;
        }
        clearInterval(lastIntervalID); //stop any previous typing
        drawText();
    }, [props.skip])

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

    
    const newTypewriter = (iSpeed) => {
        if(!iSpeed){
            iSpeed = 50; // time delay of print out
        }
        var iIndex = 0; // start printing array at this posision
        var iArrLength = textArray && textArray[0].length; // the length of the text array
        var iScrollAt = 20; // start scrolling up at this many lines       
        var iTextPos = 0; // initialise text position

        let intervalID = setInterval(()=>{   
            setSFXon(true);
            iTextPos++;
            setText((text) => {
                text[iIndex] = <p key={`line-${iIndex}`}>{textArray && textArray[iIndex].substring(0, iTextPos)}<span className='caret'></span></p>;
                return [...text];
            });
            if (iTextPos == iArrLength) {
                iTextPos = -1;
                iIndex++;
                if (iIndex != textArray.length) {
                    setSFXon(false);
                    //Clear carat from previous line
                    setText((text) => {
                        if(text[iIndex -1]){
                            text[iIndex-1] = <p key={`line-${iIndex-1}`}>{textArray[iIndex-1].substring(0, iArrLength)}</p>;
                        }
                        text[iIndex] = <p key={`line-${iIndex}`}><span className='caret'></span></p>
                        return [...text];
                    });
                    //Write next line
                    iArrLength = textArray[iIndex].length; //Next line's length
                }else{
                    //Make last line carat blink
                    setText((text) => {
                        text[iIndex-1] = <p key={`line-${iIndex-1}`}>{textArray[iIndex-1].substring(0, iArrLength)}<span className='caret blink'></span></p>;
                        return [...text];
                    });
                    //Stop SFX
                    setSFXon(false);
                    stopTyping();
                    //Show the buttons after a delay
                    setTimeout( () => {
                        props.toggleButtons(true)
                    }, 750);
                    return;
                }
            }
        },iSpeed);

        const stopTyping =  function(){
            clearInterval(intervalID);
            console.log('stopped!');
        }
        return intervalID;
    }

    const drawText = () => {
        props.setSkip(false);
        setText(textArray.map( (item, index) => {
            return item ? <p key={`line-${index}`}>{item}{index+1 == textArray.length ? <span className='caret'></span> : null}</p> : null
        }))
        setSFXon(false);
        setTimeout( () => {
            props.toggleButtons(true)
        }, 50);
    }

    const drawImage = () => {
        setSFXon(false);
        const fontSize = story[props.chapter].imageFontSize;
        let image = 
        <pre>
            <p className={'ascii ascii__animated collapsed'}  style={{textAlign: 'center',fontSize: fontSize}}>
                {images[story[props.chapter].imagePath]}
            </p>
        </pre>
        setImageContent(image);
        //Display the image after a short delay
        setTimeout(()=>{
            console.log('remove collapsed');
            let image = 
            <pre>
                <p className={'ascii ascii__animated'}  style={{textAlign: 'center',fontSize: fontSize}}>
                    {images[story[props.chapter].imagePath]}
                </p>
            </pre>
            setImageContent(image);
            setSFXon(true);
            //Stop music after 5seconds (animation duration)
            setTimeout( () =>{ setSFXon(false) },2250);
        },100)

        //Show the buttons after a delay
        setTimeout( () => {
            props.toggleButtons(true);
        }, 2000);
    }

    const playBackgroundMusic = () => {
        let song = Music[story[props.chapter].music];
        let bgMusic = new Howl({
            src: [song],
            volume: 0.25,
            loop: true,
            onloaderror: (err)=>{console.error(`music load error:${err}`)},
            onload: function(){console.log('start')},
            onplayerror: (err)=>{console.log(err)},
        })
        bgMusic.play();
        return bgMusic;
    }

    const setupSFX = () => {
        //Load SFX
        let SFXfile = SFX['pi']
        let morseSFX = new Howl({
            src: [SFXfile],
            volume: 0.25,
            loop: true,
            preload: true,
            onloaderror: (err)=>{console.error(`music load error:${err}`)},
            onload: function(){console.log('start')},
            onplayerror: (err)=>{console.log(err)},
        })
        setMorseSFX(morseSFX);
        return morseSFX;
    }

    let lines = text.map( (line,index) => {
        return line
    })


    return(
        <React.Fragment>
            {imageContent}
            {lines}
        </React.Fragment>
    )
}

Story.propTypes = {
    chapter: propTypes.string.isRequired,
    toggleButtons: propTypes.func.isRequired,  
    skip: propTypes.bool.isRequired,
    setSkip: propTypes.func.isRequired,
}