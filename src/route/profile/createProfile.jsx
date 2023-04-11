import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { redirect } from "react-router-dom";
import { useMultistepForm } from "../../components/MultistepForm.jsx";

import GetProfileHobbies from "./hobbies";
import Enrollment from "./enrollment";
import GetIdentity from "./identity";
import GetMakePublic from "./makePublic";
import MultiStepProgressBar from "../../components/MultistepProgressBar";
import style from '../../styles/formStyle.module.css';
import logo from '../../images/login_logo.png';
import { setLoggedIn } from "../../redux/auth/authSlice";

// type FormData = {

//     firstName: string
//     lastName: string
//     age: string
//     program: string
//     admission_year: string
//     faculty: string
//     course: string
//     customtag: string
//     label1: string
//     label2: string

// }

function CreateProfile(){
    //retrieve profile info from Redux
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.email);
    const userName = useSelector((state) => state.user.username);
    const firstName = useSelector((state) => state.user.first_name);
    const lastName = useSelector((state) => state.user.last_name);
    const imgURL = useSelector((state) => state.user.image_url);
    const gender = useSelector((state) => state.user.gender);
    const faculty = useSelector((state) => state.user.faculty);
    const program = useSelector((state) => state.user.program);
    const year = useSelector((state) => state.user.year);
    const courses = useSelector((state) => state.user.courses);
    const tags = useSelector((state) => state.user.tags);
    const profileVisible = useSelector((state) => state.user.profile_visible);
    const agreement = useSelector((state) => state.user.agreement);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const id = '';

    const { steps, currentStepIndex, step,isFirstStep,isLastStep,back,next } = useMultistepForm([<GetIdentity/>,<Enrollment/>,<GetProfileHobbies/>,<GetMakePublic new={true}/>]);
    const [isHover,setHover] = useState(false);
    const [isHover2,setHover2] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [msg, setProfileMessage] = useState("");
    const location = useLocation();

    function login(){
        dispatch(setLoggedIn(true));
    }

    function MouseOver() {
        setHover(true);
    }
    
    function MouseOut() {
        setHover(false);
    }

    function MouseOver2() {
        setHover2(true);
    }
    
    function MouseOut2() {
        setHover2(false);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!isLastStep) {
            next();
        }
    }

    function handleSubmit() {
        if (isLastStep) {
            if (firstName != '' && lastName != '' && gender != '' && imgURL != '' && agreement) {
                setSubmitError("")
                fetch(process.env.REACT_APP_API_LINK + '/user/profile', {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                        },
                    body: JSON.stringify({
                        email: email,
                        username: userName,
                        first_name: firstName,
                        last_name: lastName,
                        image_url: imgURL,
                        gender: gender,
                        faculty: faculty,
                        program: program,
                        year: year,
                        courses: courses,
                        tags: tags,
                        profile_visible: profileVisible
                        })
                })
                .then(response => {
                    if (response.status === 200){
                        login();
                    }
                    return response.json()
                })
                .then(json => setProfileMessage(json.message));
            }
            else {
                setSubmitError("Please fill up first page and agree to user agreement")
            }
        }
        else {
            if (firstName != '' && lastName != '' && gender != '' && imgURL != '' && agreement) {
                setSubmitError("")
            }
        }
    }

    React.useEffect(() => {
        //fill out actions based on the response from the backend
        if (msg === "success") {
            window.location.href = "/home";
        }
    }, [msg]);
    
    return (

        <>
        <div className={style.profileForm}> 
      {/* className="row mx-auto fs-5 fw-light" */}
       {currentStepIndex == 0 && <p className= "row mx-auto fs-5 fw-light" >Welcome to UW Connect, let get you setup... </p>}
       {currentStepIndex == 1 && <p className= "row mx-auto fs-5 fw-light">What are you enrolling in this term? </p>}
       {currentStepIndex == 2 && <p className= "row mx-auto fs-5 fw-light">Tell us more about your hobbies... </p>}
       {currentStepIndex == 3 && <p className= "row mx-auto fs-5 fw-light">We're almost done! </p>}
       <br></br>
       {/* className="row col-4" */}
        <div ><MultiStepProgressBar onPageNumberClick={currentStepIndex + 1}/></div>
        <form  onSubmit={onSubmit}>
            
            {/* <div className={style.profileContainer}> */}
                
                {/* <label>{currentStepIndex + 1} / {steps.length}</label> */}
            
            <div className={style.profileContainer}> 
            <p className={style.errorMsg}>{submitError}</p>
            {step}
            </div>
            {/* </div> */}
            <div style={{display: "flex", justifyContent: "center"}}>
            {!isFirstStep && <button 
                    className={style.profileButtonBack}
                    type = "button"
                    style = {{ backgroundColor : isHover ? "orange" : "black",marginTop : 50, marginRight : 20,  }}
                    onMouseOver={MouseOver} 
                    onMouseOut={MouseOut}
                    onClick={back}

            >Back</button>}
             <button 
                    className={style.profileButtonNext}
                    type = "submit"
                    style = {{ backgroundColor : isHover2 ? "orange" : "black",marginTop : 50, right : isFirstStep ? "27.5%" : "0%"}}
                    onMouseOver={MouseOver2} 
                    onMouseOut={MouseOut2}
                    onClick={handleSubmit}
            >{isLastStep ? "Submit" : "Next"}</button>
            </div>
            
        </form>
    
        </div>

        </>

    );
}

export default CreateProfile;