import React, {useState, useEffect} from 'react';
import { isArray } from 'util';
import textLogo from '../../assets/ascii/logo';
import story from '../../assets/story/story';
import propTypes from 'prop-types';

export default function MainMenu(props){
    const [text, setText] = useState([]);

    // set up text to print, each item in array is new line
    // var textArray = new Array(
    //     "Are you ready?",
    //     "Please make your selection below"
    //     );
    var textArray = story[0].textArray;

    useEffect( () => {
        console.log('try');
        typewriter(textArray);
    },[])

    // Functions

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
                        iArrLength = textArray[iIndex].length; //next line's length
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
                <pre>
                    <p className='ascii' style={{textAlign: 'center'}}>
                        {textLogo}
                    </p>
                </pre>
                <br/>
                <div style={{paddingLeft:'15px',textAlign: 'left', margin:'auto', width:'500px'}}>
                    {lines}
                </div>
            </React.Fragment>
        )
}

MainMenu.propTypes = {
    toggleButtons: propTypes.func.isRequired,
}