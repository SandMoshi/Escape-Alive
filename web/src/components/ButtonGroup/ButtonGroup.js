import React, {useState, useEffect} from 'react';
import './ButtonGroup.css';
import story from  '../../assets/story/story';
import propTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';


export default function ButtonGroup(props){

    const goToChapter = (to) => {
        props.setChapter(to);
    } 

    function Button(props){
        return(
            <div className='button' onClick={ () => 
                {
                    props.toggleButtons(false);
                    goToChapter(props.to)}
                }>
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
            <CSSTransition 
                in={props.showButtons}
                timeout={300}
                classNames='buttons'
                unmountOnExit
            >
                <div className='btngroup'>
                    {story[props.chapter].options.a &&
                        <Button to={story[props.chapter].options.a.goToChapter} toggleButtons={props.toggleButtons} >
                            {story[props.chapter].options.a.buttonText}
                        </Button>}

                    {story[props.chapter].options.b &&
                        <Button to={story[props.chapter].options.b.goToChapter} toggleButtons={props.toggleButtons}>
                            {story[props.chapter].options.b.buttonText}
                        </Button>}
                </div>
            </CSSTransition>
       )
    }
    else if(story[props.chapter].textArray){
       return(
            <React.Fragment>
                <div className='btngroup'>
                    {props.chapter != 0 ? <Skip /> : null}
                </div>
            </React.Fragment>
       )
    }
    else return null
}

ButtonGroup.propTypes = {
    setChapter: propTypes.func.isRequired,
    chapter: propTypes.string.isRequired,
    showButtons: propTypes.bool.isRequired,
    toggleButtons: propTypes.func.isRequired,
    toggleSkip: propTypes.func.isRequired,
    skip: propTypes.bool.isRequired
}