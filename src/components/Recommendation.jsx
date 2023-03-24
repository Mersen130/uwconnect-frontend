import React, {useState} from "react";
import style from '../styles/recommendation.css'
import {redirect} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import UserCard from "./userCard";
import { Divider, Button, Tooltip, Drawer, Typography  } from 'antd';
import { EditOutlined } from "@ant-design/icons"
import MultiSelectLargeList from "./MultiSelectLargeList";
import { useSelector } from "react-redux";
import Badge from 'react-bootstrap/Badge';
import cat1 from '../images/cat1.jpeg';
import cat2 from '../images/cat2.jpeg';
import dog1 from '../images/dog1.jpeg';
import dog2 from '../images/dog2.jpeg';

const { Title } = Typography;

var jsonstring = 
[{ "email": "user@example.com", "username": "Johnny Depp 1", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-650"],"tags": ["teaefae","vhsroshsh1"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 2", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-651"],"tags": ["tesrgs","videsbss"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 3", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-652"],"tags": ["taeeas","viasfbe"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 4", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-653"],"tags": ["taets","vidsfbeae"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 5", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-654"],"tags": ["taettnis","vsbsdme"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 6", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-655"],"tags": ["tesets","vixbsdge"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 7", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-656"],"tags": ["tsdgcvs","vhjsgrame"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 8", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-657"],"tags": ["tsgis","vixfhe"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 9", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-658"],"tags": ["txggis","vidxfbxe"],"bio": "string","id": "string"},
{ "email": "user@example.com", "username": "Johnny Depp 10", "gender": "string","faculty": "string","program": "string","year": 0,"courses": ["ECE-659"],"tags": ["texfbbgis","vixfg"],"bio": "string","id": "string"}                

];

function GetRecommendation(){
    const [coursesList, setCoursesList] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [hobbiesList, setHobbiesList] = useState([])
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [openPreferencePopup, setOpenPreferencePopup] = useState(false);
    let userDetail = useSelector((state) => state.user)

    let tempSelectedCourses = [];
    let tempSelectedHobbies = [];
    useState(() => {
        getListClass();
        getListHobby();
        getRecommendationConnections();
    })

    function getListClass() {
        fetch(process.env.REACT_APP_API_LINK + '/enrollment', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            let courseList = json.course.map((item) => {return {"value" : item, "label": item }})
            setCoursesList(courseList)
        })
    }

    function getListHobby() {
        fetch(process.env.REACT_APP_API_LINK + '/hobbies', { credentials: 'include' })
          .then(response => response.json()) //Arrow function to turn fetched data into json
          .then(json => {
            let hobbiesList = json['hobbies'].map((item) => {return {"value" : item, "label": item }})
            setHobbiesList(hobbiesList)
        }) //Arrow function to get hobbies
    }

    function getRecommendationConnections() {

    }

    const getContainer = (id) => {
        return () => {
          if (!id || typeof document === 'undefined') return null;
          return document.getElementById(id);
        }
    }

    const openPreferenceEdit = () => {
        setOpenPreferencePopup(true);
    };
    const submitPreferenceEdit = () => {
        setSelectedCourses(tempSelectedCourses)
        setSelectedHobbies(tempSelectedHobbies)
        let userRequest = {}
        Object.assign(userRequest, userDetail);
        userRequest.courses = tempSelectedCourses.map((item) => item.value)
        userRequest.tags = tempSelectedHobbies.map((item) => item.value)
        console.log(userRequest)
        setOpenPreferencePopup(false);
    };
    const closePreferenceEdit = () => {
        setOpenPreferencePopup(false);
    };

    const onCoursesFilterSelected = (selectedOption) => {
        tempSelectedCourses = selectedOption

    }

    const onHobbiesFiltereSelected = (selectedOption) => {
        tempSelectedHobbies = selectedOption
    }

    // var jsonparse = JSON.parse(jsonstring);
    const Recommendation = jsonstring.map((data) => {
                            return (
                                <div style={{display : "inline"}}>
                                <UserCard img = {cat1} name = {data.username} course = {data.courses[0]} hobby1 = {data.tags[0]} hobby2 = {data.tags[1]}/>
                                </div>
                            )})

    return (
        <div style={{width:"100%" , height: "100%", overflow: "auto" }} id="rec-container">
            <Drawer
                title="Edit Preference"
                placement="top"
                closable={false}
                open={openPreferencePopup}
                getContainer={false}
                onClose={closePreferenceEdit}
                destroyOnClose={true}
                rootClassName="col-9"
                rootStyle={{left: '25%'}}
            >
                <div className="row col-12 m-0 flex-column" style={{minHeight: '85%'}}>
                    <div>
                        <Title level={5}>Courses</Title>
                        <MultiSelectLargeList
                            placeholder="Type to search"
                            defaultValue={selectedCourses}
                            options={coursesList}
                            onUpdate={onCoursesFilterSelected}
                            maxHeight='180px'
                        />
                    </div>
                    <div>
                        <Title level={5}>Hobbies</Title>
                        <MultiSelectLargeList
                            placeholder="Type to search"
                            defaultValue={selectedHobbies}
                            options={hobbiesList}
                            onUpdate={onHobbiesFiltereSelected}
                            maxHeight='140px'
                        />
                    </div>
                </div>
                <div className="row" style={{minHeight: '15%'}}>
                    <div className="col-12 m-0 d-flex flex-row justify-content-end">
                        <Button className="me-1" onClick={submitPreferenceEdit} type="primary">Apply</Button>
                        <Button className="ms-1" onClick={closePreferenceEdit}>Cancel</Button>
                    </div>
                </div>
            </Drawer>
            <Divider orientation="left">Preference: </Divider>
            <div className="row m-0">
                <div style={{paddingLeft: '3%', fontSize: 'large'}}>
                    {[...selectedCourses,...selectedHobbies].map((item) => (
                        <Badge className="me-1" bg="warning" text = "dark">{item.label}</Badge>
                    ))}
                    <Tooltip title="Edit preference">
                        <Button className="round-btn" onClick={openPreferenceEdit} type="primary" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                </div>
            </div>
            <Divider orientation="left">Recommend Connection</Divider>
            <div className="row m-0">
                <div className="rec-section m-0">
                {
                    Recommendation
                    
                }
                </div>
                
            </div>
        </div>
        
        // <div><UserCard img = {cat1} name = "Johnny Depp" course = "Test Course 123" hobby1 = "Test Hobby 123" hobby2 = "Test Hobby 456"/></div>
    )


}

export default GetRecommendation;