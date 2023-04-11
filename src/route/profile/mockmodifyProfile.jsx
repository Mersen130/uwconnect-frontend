import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useMultistepForm } from "../../components/MultistepForm.jsx";

import GetProfileHobbies from "./hobbies";
import Enrollment from "./enrollment";
import GetIdentity from "./identity";
import GetMakePublic from "./makePublic";
import style from '../../styles/formStyle.module.css';
import { setLoggedIn } from "../../redux/auth/authSlice";
import { setUser } from "../../redux/profile/profileSlice";

function ModifyProfile(){
    //retrieve profile info from Redux
    const dispatch = useDispatch();
    let email = useSelector((state) => state.auth.email);
    let userName = useSelector((state) => state.user.username);
    let firstName = useSelector((state) => state.user.first_name);
    let lastName = useSelector((state) => state.user.last_name);
    let imgURL = useSelector((state) => state.user.image_url);
    let gender = useSelector((state) => state.user.gender);
    let faculty = useSelector((state) => state.user.faculty);
    let program = useSelector((state) => state.user.program);
    let year = useSelector((state) => state.user.year);
    let courses = useSelector((state) => state.user.courses);
    let tags = useSelector((state) => state.user.tags);
    let profileVisible = useSelector((state) => state.user.profile_visible);
    const [flag, setFlag] = useState(false);
    let select = useSelector((state) => (state))

    const [isHover, setHover] = useState(false);
    const [isHover2, setHover2] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [msg, setProfileMessage] = useState("");

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

    function handleSubmit() {
        if (firstName != '' && lastName != '' && gender != '' && imgURL != '') {
            fetch(process.env.REACT_APP_API_LINK + '/user/profile', {
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
            .then(response =>  response.json())
            .then(json => setProfileMessage(json.message));
        }
        else {
            setSubmitError("Please fill up personal info")
        }
    }

    function handleCancel() {
        window.location.href = '/home';
    }

    React.useEffect(() => {
        // fetch user profile
        fetch(process.env.REACT_APP_API_LINK + `/user/profile?email=${encodeURIComponent(email)}`, { credentials: 'include' })
        .then(response => response.json())
        .then(user => {
            dispatch(setUser(user))
            setFlag(true) //flag is to make sure that the page renders only after it finishes fetching from the backend
        })
    }, []);

    React.useEffect(() => {
        if (firstName != '' && lastName != '' && gender != '' && imgURL != '') {
            setSubmitError("");
        }
    }, [select]);

    React.useEffect(() => {
        if (msg == "success") {
            window.location.href = '/home';
        }
      }, [msg]);

    return (
        <>
        
        <div style={{height:"93vh"}} className="container-fluid row d-flex flex-row overflow-auto text-center"> 
            <div className="row">
                <div data-testid = "modProfile-1" className="col-xl-5 col-6 m-auto"> 
                    <h1>---Personal info---</h1>
                    {<GetIdentity/>}
                    <br></br>
                    <h1>---Enrollment info---</h1>
                    {<Enrollment/>}
                    <br></br>
                    <h1>---Hobby---</h1>
                    {<GetProfileHobbies/>}
                    <br></br>
                    <h1>---Profile visibility---</h1>
                    {<GetMakePublic new={false}/>}
                    <br></br>
                </div>
            </div>
            <div className="row">
                <div className="col-8 m-auto d-flex justify-content-center">
                    <p className={style.errorMsg}>{submitError}</p>
                    <button
                        type="button" 
                        className="btn btn-dark me-4"
                        onClick={handleCancel}
                    >Cancel</button>
                    <button
                        type="button" 
                        className="btn btn-dark"
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default ModifyProfile;