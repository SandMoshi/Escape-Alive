import React, {useState, useEffect} from 'react';
import './screen.css';
import MainMenu from '../Chapters/MainMenu';
import Story from '../Chapters/Story';

export default function Screen(props){
    const [text, setText] = useState('');


    // On intial render
    useEffect(() => {
        console.log(props)
    },[])

    useEffect( () => {
        console.log('Props:', props);
    }, [props])

    //Functions

    if(props.chapter === 0){
        return(
            <div className='screen'>
                <MainMenu />
            </div>
        )
    }
    return(
        <div className='screen'>
            <Story chapter={props.chapter} />
        </div>
    )
}



