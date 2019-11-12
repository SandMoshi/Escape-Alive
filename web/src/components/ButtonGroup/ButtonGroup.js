import React, {useState, useEffect} from 'react';
import './ButtonGroup.css';
import story from  '../../assets/story/story';
import propTypes from 'prop-types';

export default function ButtonGroup(props){

    const goToChapter = (to) => {
        props.setChapter(to);
    } 

    function Button(props){
        return(
            <div className='button' onClick={ () => goToChapter(props.to)}>
                {props.children || null}
            </div>
        )
    }

    function Skip(){
        return(
            <div className='button' onClick={()=>props.toggleSkip()}>
                Skip
            </div>
        )
    }

    // const skipButton = <Button>Skip</Button>;

    if(props.showButtons){
       return(
        <React.Fragment>
            <div className='btngroup'>
                {story[props.chapter].options.a &&
                    <Button to={story[props.chapter].options.a.goToChapter} >
                        {story[props.chapter].options.a.buttonText}
                    </Button>}

                {story[props.chapter].options.b &&
                    <Button to={story[props.chapter].options.b.goToChapter} >
                        {story[props.chapter].options.b.buttonText}
                    </Button>}
            </div>
        </React.Fragment>
       )
    }else{
       return(
            <React.Fragment>
                <div className='btngroup'>
                    {props.chapter != 0 ? <Skip /> : null}
                </div>
            </React.Fragment>
       )
    }
}

ButtonGroup.propTypes = {
    setChapter: propTypes.func.isRequired,
    chapter: propTypes.number.isRequired,
    showButtons: propTypes.bool.isRequired,
    toggleSkip: propTypes.func.isRequired,
    skip: propTypes.bool.isRequired
}