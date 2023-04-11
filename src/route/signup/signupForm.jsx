import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { setEmail } from '../../redux/auth/authSlice'
import style from '../../styles/formStyle.module.css';
import logo from '../../images/login_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import { Avatar } from "antd";


function GetSignupForm(){
    const dispatch = useDispatch();
    //let history = useHistory();
    var RegisterStatus = false;
    const [isClick, setClickStatus] = useState(false);
    const [isHover, setHover] = useState(false);
    const [pass, setPWValue] = useState("");
    const [email, setEmailValue] = useState(""); 
    const [emailError, setEmailError] = useState("");
    const [emailCheckError, setEmailCheckError] = useState("");
    const [passError, setPWerror] = useState(""); 
    const [confirmError, setConfirmError] = useState(""); 
    const [confirmPW, setConfirmPWValue] = useState(false);
    const [msg, setRegisterMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");
    const navigate = useNavigate();

    function TogglePass() {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    }

    function ToggleConfirmPass() {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");
        } else {
            setConfirmPasswordType("password");
        }
    }

    function ButtonClick() {
        setClickStatus(true);
        
        if (emailCheckError === "" && passError === "" && confirmError === "") {
            fetch(process.env.REACT_APP_API_LINK + '/user/register', {
            //fetch('http://127.0.0.1:5000/user/register', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    })
                })
                .then(response => {
                    if (response.status === 200){
                        dispatch(setEmail(email)); // save email to Redux
                    }
                    return response.json()
                })
                .then(json => setRegisterMessage(json.message));
            //setRegisterMessage(JSON.stringify({email: Email, password: Pass}));
        }
    }

    function CheckRegisterStatus() {
        if (RegisterStatus === true) {
            window.location.href = '/createprofile';
        } 
    }
    
    function MouseOver() {
        setHover(true);
    };
    
    function MouseOut() {
        setHover(false);
    }

    function HandlePWChange(event) {
        setPWValue (event.target.value);

        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=])(?=.{8,}).*$/.test(event.target.value) === false)
        {
            setPWerror ("Password needs to be at least 8 in length, one number, one upper case, one lower case and one special character") ;
        }
        else {
            setPWerror ("") ;
        }

        //setRegisterMessage(JSON.stringify({email: Email, password: Pass}));
    }

    function OnConfirmChange(event) {
        if (event.target.value !== pass){
            setConfirmPWValue(false);
            setConfirmError("Password does not match");
            event.target.setCustomValidity("Password does not match");
        }
        else {
            setConfirmPWValue(true);
            setConfirmError("");
        }
    }

    function OnEmailChange(event) {
        setEmailCheckError("");
        setEmailValue(event.target.value);
        setRegisterMessage("");

        if (/@uwaterloo.ca$/.test(event.target.value) === false)
        {
            setEmailError("Please use a uwaterloo email");
        }
        else {
            setEmailError("");
        }
    }

    React.useEffect(() => {
        if (msg === "exist") {
            setEmailCheckError("Email already exists");
        }
        if (msg === "success") {
            RegisterStatus = true;
        }

        CheckRegisterStatus();
    }, [msg]);

    return (
        <div data-testid = "signup-1" className={style.loginContainer}>
            {/* <form>  */}
            <   Avatar className='my-auto' size={190} src={<img src={logo} alt="" />} />
                <h1 >UWConnect</h1>
                <input type="text" placeholder="Email" onChange={OnEmailChange}/>
                <p className={style.errorMsg}>{emailError}</p>
                <input type={passwordType} style={{display:"inline-block"}} className={style.password} placeholder="Password" onChange={HandlePWChange} />
                <button className={style.togglePass} onClick={TogglePass}>
                    { passwordType==="password" ? <Icon.EyeSlash color="black" /> : <Icon.Eye color="black" /> }
                </button>
                <p className={style.errorMsg}>{passError}</p>
                <input type={confirmPasswordType} style={{display:"inline-block"}} className={style.password} placeholder="Confirm  Password" onChange={OnConfirmChange} />
                <button className={style.togglePass} onClick={ToggleConfirmPass}>
                    { confirmPasswordType==="password" ? <Icon.EyeSlash color="black" /> : <Icon.Eye color="black" /> }
                </button>
                <p className={style.errorMsg}>{confirmError}</p>
                <p className={style.errorMsg}>{emailCheckError}</p>
                {/* <p>{Msg}</p> */}
                <button 
                    onClick={ButtonClick}
                    onMouseOver={MouseOver} 
                    onMouseOut={MouseOut}
                    style={{ backgroundColor : isHover ? "orange" : "black"}}
                >Register
                </button>
                <p data-testid = "signup-2" style={{fontSize: "18px"}}>Already have an account? <a data-testid = "signup-3" href="/login" style={{color:"orange"}} >Login</a></p>
            {/* </form> */}
        </div>
    );


}

export default GetSignupForm;