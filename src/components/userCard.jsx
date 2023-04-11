import React, { useState } from "react";
import { MessageTwoTone, CloseCircleTwoTone, MessageFilled, CloseCircleFilled } from "@ant-design/icons";
import styles from "../styles/userCard.css";
import Badge from 'react-bootstrap/Badge';

function UserCard(props){
    const [visibility, setVisibility] = useState(true);

    const [isHover,setHover] = useState(false);
    const [isHover2,setHover2] = useState(false);

    function MouseOver() {
        setHover(true);
    };
    
    function MouseOut() {
        setHover(false);
    }

    function MouseOver2() {
        setHover2(true);
    };
    
    function MouseOut2() {
        setHover2(false);
    }

    function removeSelf(){
        setVisibility (false);
    }

    function sendMessage(){
        props.messageHandler(props.email)
    }

    return (
        <div>
        {visibility && (
        <div className="cardContainer">
            <div className="cardImg"><img  src = {props.img} style={{height : "100%" , borderRadius: "50%", width: "100%"}} ></img></div>
            <div className = "cardName"><p style={{fontSize: 24}} >{props.name}</p></div>
            {/* "#20f50c" */}
            <div className="cardButton1"><button className="accept card-button"  onClick={sendMessage} onMouseOver={MouseOver} onMouseOut={MouseOut}><MessageFilled style={{color :  !isHover ? "orange" : "white", boxShadow: isHover && '0px 0px 20px 5px white', borderRadius: "50%"}} twoToneColor={ isHover ? "orange" : "#20f50c" } /></button></div>
            <div className="cardButton2"><button className="decline card-button" onClick={removeSelf}onMouseOver={MouseOver2} onMouseOut={MouseOut2} ><CloseCircleFilled style={{color :  !isHover2 ? "orange" : "white", boxShadow: isHover2 && '0px 0px 20px 5px white', borderRadius: "50%"}} twoToneColor={ isHover2 ? "orange" : "red"} /></button></div>
            <div className = "cardPad">
                <div className="tagList">
                <h5 style={{display : "inline"}}><Badge bg = "warning" text = "dark">{props.course} </Badge></h5>{' '}
                <h5 style={{display : "inline"}}> <Badge bg = "warning" text = "dark">{props.hobby1}</Badge></h5>{' '}
                <h5 style={{display : "inline"}}><Badge bg = "warning" text = "dark">{props.hobby2}</Badge></h5>
                </div>
            </div>
        </div> )
        }
        </div>

    );

}

export default UserCard;