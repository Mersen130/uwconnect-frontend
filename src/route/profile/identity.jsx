import React, { useState } from "react";
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux'
import { setImgURL, setUserName, setFirstName, setLastName, setGender } from '../../redux/profile/profileSlice'
import style from '../../styles/formStyle.module.css';
import TagButton from '../../components/TagButton'


//https://stackoverflow.com/questions/63939772/rsuite-not-working-properly-how-to-fix-reactjs

/*
When user login, if user profile is not exist then redirect user to user profile page. user profile page included 3 screen:

The 1st screen: 
display name: only allow input alphabet character
select profile picture: user can choose to user a profile pictures from list of 6 profile picture pre-set gender

The 2nd screen:
Program: user can choose between: Undergraduate, Graduated
Admission year: user can choose the year that user joined the program
display a list of available faculties such that: ECE,CS, MSCI…
Currently Taking Course: user can pick the class that they currently joined.

=======================================================
The 3rd screen: <= This Part
Custom tag: all the optional tag that user can select.
=======================================================

The 4th screen:
A check box as user to make your profile public
A check box as user accept the user agreement.
A submit button to submit data to create user Profile
*/

const selectStyle = {
    control: (base, state) => ({
      ...base,
      background: "#282c34",
      
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "white" : "white",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "white" : "white"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      color: 'white',
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    
    menuList :(baseStyles, state) =>
     ({...baseStyles,
    
      color: 'black'}),
    singleValue: (base, state) => ({
        ...base,
        color: state.isFocused ? 'orange' : 'white'}),
    placeholder: (base, state) => ({
        ...base,
        color: 'white'}),
    multiValue : (baseStyles, state) => ({...baseStyles,backgroundColor: 'orange'}),
    // input : base => ({color:"white"})  
    // valueContainer : base => ({color:"white"})
    indicatorsContainer: (baseStyles, state) => ({
        ...baseStyles,
        height: '100px',
    }),
  };


function GetIdentity() {
    const dispatch = useDispatch(); //This is used to store a value into Redux store
    //Use `useState` to declare variables and setters to update variable
    const fName = useSelector((state) => state.user.first_name); //retrieve value from Redux store and use as default
    const lName = useSelector((state) => state.user.last_name);
    const genderTag = useSelector((state) => state.user.gender);
    const imgURL = useSelector((state) => state.user.image_url);
    const [nameError, setNameError] = useState("");

    const genders = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'other', label: 'Other'}
    ];

    const profilePics = [
        { value: '/images/dog1.jpeg', label: <div><img alt="" src="/images/dog1.jpeg" height="100px" width="100px"/></div>},
        { value: '/images/dog2.jpeg', label: <div><img alt="" src="/images/dog2.jpeg" height="100px" width="100px"/></div>},   
        { value: '/images/cat1.jpeg', label: <div><img alt="" src="/images/cat1.jpeg" height="100px" width="100px"/></div>},
        { value: '/images/cat2.jpeg', label: <div><img alt="" src="/images/cat2.jpeg" height="100px" width="100px"/></div>}
 ];

    function UpdateFirstName(event) {
        dispatch(setFirstName(event.target.value))
        dispatch(setUserName(event.target.value.concat(lName)))

        if (/^(?=.*[a-zA-Z])(?=.{1,}).*$/.test(event.target.value) === false || /^(?=.*[a-zA-Z])(?=.{1,}).*$/.test(lName) === false)
        {
            setNameError ("First and last names cannot be empty and can only be alphabet letters");
        }
        else {
            setNameError ("");
        }
    }

    function UpdateLastName(event) {
        dispatch(setLastName(event.target.value))
        dispatch(setUserName(fName.concat(event.target.value)))
        
        if (/^(?=.*[a-zA-Z])(?=.{1,}).*$/.test(fName) === false || /^(?=.*[a-zA-Z])(?=.{1,}).*$/.test(event.target.value) === false)
        {
            setNameError ("First and last names cannot be empty and can only be alphabet letters");
        }
        else {
            setNameError ("");
        }
    }

    // function handleGenderChange(e) {
    //     setSelectedGender(e);
    //     setGenderTag(e.currentTarget.value);
    //     dispatch(setGender(e.currentTarget.value))
    // }

    const handleGenderChange = (tag, checked) => {
        const nextSelectedTag = checked
          ? tag
          : '';
        dispatch(setGender(nextSelectedTag));
    }

    function handleProfilePicChange(e) {
        dispatch(setImgURL(e.value));
    }

    return (
        <div data-testid = "identity-1">
            {/* <h3>Tell us more about yourself...</h3> */}
            <br></br>
            <Select
                // className={style.selectionBox}
                styles={selectStyle}
                defaultValue={profilePics.filter(function(list) {
                    return list.value === imgURL;
                })}
                placeholder="--Select Profile Picture--"
                options={profilePics}
                onChange={handleProfilePicChange}
            />
            <input className="form-control" type="text" defaultValue={fName} placeholder="First Name" onChange={UpdateFirstName}/>
            <input className="form-control" type="text" defaultValue={lName} placeholder="Last Name" onChange={UpdateLastName}/>
            <p className={style.errorMsg}>{nameError}</p>
            {/* <Select
                className={style.selectionBox} 
                styles={{
                    indicatorsContainer: (baseStyles, state) => ({
                        ...baseStyles,
                        height: 45,
                    }),
                }}
                placeholder="--Select Gender--"
                value={selectedGender}
                options={genders}
                onChange={handleGenderChange}
            /> */}
            <div>
                {/* <p className="fs-5" >Gender</p> */}
                
                {genders.map((item) => (
                    <TagButton
                        key={item.value}
                        keyValue={item.value}
                        label={item.label} 
                        selected={genderTag === item.value}
                        onUpdateValue={handleGenderChange}
                    />
                ))
                }
            </div>
        </div>
    );
}

export default GetIdentity;