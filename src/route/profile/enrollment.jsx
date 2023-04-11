import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setFaculty, setYear, setProgram, setCourses } from '../../redux/profile/profileSlice'
import style from '../../styles/formStyle.module.css';
import {redirect} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Border } from "react-bootstrap-icons";
import MultiSelectLargeList from "../../components/MultiSelectLargeList";

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
      },
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: 'white',
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        // override border radius to match the box
        color: 'white',
        borderRadius: 0,
        // kill the gap
        marginTop: 0
    }),
    menuList: (baseStyles) => ({
        ...baseStyles,
        maxHeight: '180px',
        color: 'black'}),
    singleValue: (base, state) => ({
        ...base,
        color: state.isFocused ? 'orange' : 'white'}),
    placeholder: (base, state) => ({
        ...base,
        color: 'white'}),
    multiValue : (baseStyles, state) => ({...baseStyles,backgroundColor: 'orange'})
  };

function Enrollment(){
    let yearList = ['1', '2', '3', '4', '5', '6', '7'];
    const dispatch = useDispatch(); //This is used to store a value into Redux store
    const programVal = useSelector((state) => { return state.user.program === "" ? null : {"value" : state.user.program, "label": state.user.program}}); //retrieve value from Redux store and use as default
    const facultyVal = useSelector((state) => { return state.user.faculty === "" ? null : {"value" : state.user.faculty, "label": state.user.faculty}});
    const yearVal = useSelector((state) => { return state.user.year === 0 ? null : {"value" : state.user.year, "label": state.user.year}});
    const courseVal = useSelector((state) => state.user.courses.map((item) => {return {"value" : item, "label": item }}));
    const [programArray, setProgramArray] = useState([]);
    const [facultyArray, setFacultyArray] = useState([]);
    const [courseArray, setCourseArray] = useState([]);
    const yearArray = yearList.map((item) => {return {"value" : item, "label": item }});
    
    function handleFacultyChange(e) {
        dispatch(setFaculty(e.value));
    }

    function handleYearChange(e) {
        dispatch(setYear(e.value));
    }

    function handleProgramChange(e) {
        dispatch(setProgram(e.value));
    }

    function handleCourseChange(e) {
        dispatch(setCourses(Array.isArray(e) ? e.map(x => x.value) : []))
    }

    useEffect(() => {
        fetch(process.env.REACT_APP_API_LINK + '/enrollment', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            setProgramArray(json.program.map((item) => {return {"value" : item, "label": item }}));
            setFacultyArray(json.faculty.map((item) => {return {"value" : item, "label": item }}));
            setCourseArray(json.course.map((item) => {return {"value" : item, "label": item }}));
        });
    }, []);

    return (
        <div data-testid = "enroll-1" className="multiSelect">
            <Select
                
                defaultValue={facultyVal}
                placeholder="Faculty" 
                styles={selectStyle}  
                options={facultyArray} 
                onChange={handleFacultyChange}
            />
            {/* <input autoFocus  type="text" /> */}
            <label>{/*Admission Year*/}</label>
            <Select
                defaultValue={yearVal}
                placeholder="Admission Year" 
                styles={selectStyle}  
                options={yearArray}  
                onChange={handleYearChange}
            />
            <label>{/*Program*/}</label>
            <Select
                defaultValue={programVal}
                placeholder="Program" 
                styles={selectStyle}  
                options={programArray} 
                onChange={handleProgramChange} 
            />
            <label>{/*Courses*/}</label>
            <MultiSelectLargeList
                class="multiSelect"
                placeholder="Courses"
                styles={selectStyle}
                defaultValue={courseVal}
                options={courseArray}
                onUpdate={handleCourseChange}
                maxHeight='180px'
            />
        </div>
    )
}

export default Enrollment;