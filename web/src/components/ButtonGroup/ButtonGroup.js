import React, {useState, useEffect} from 'react';
import './ButtonGroup.css';
import story from  '../../assets/story/story';

export default function ButtonGroup(props){

    const goToChapter = (to) => {
        alert(`Go to ${to}`);
        props.setChapter(to);
    } 

    function Button(props){
        return(
            <div className='button' onClick={ () => goToChapter(props.to)}>
                {props.children || null}
            </div>
        )
    }

    return(
        <div className='btngroup'>
            <Button to={story[props.chapter].options.a.goToChapter} >
                {story[props.chapter].options.a.buttonText}
            </Button>
            <Button to={story[props.chapter].options.b.goToChapter} >
                {story[props.chapter].options.b.buttonText}
            </Button>
        </div>
    )
}