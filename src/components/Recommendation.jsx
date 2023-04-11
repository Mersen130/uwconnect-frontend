import React, {useEffect, useState} from "react";
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

function GetRecommendation(props){
    const [coursesList, setCoursesList] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [hobbiesList, setHobbiesList] = useState([])
    const [selectedHobbies, setSelectedHobbies] = useState([])
    const [openPreferencePopup, setOpenPreferencePopup] = useState(false);
    const [RecommendationList, updateRecommendationList] = useState();
    let userDetail = useSelector((state) => state.user)
    const [userRequest, setUserRequest] = useState(userDetail)

    let tempSelectedCourses = [...selectedCourses];
    let tempSelectedHobbies = [...selectedHobbies];
    useEffect(() => {
        getListClass();
        getListHobby();
        
    }, [selectedCourses, selectedHobbies])

    useEffect(() => {
        let tmpUserDetail = userRequest;
        if (!userRequest.email || userRequest.email === '') {
            tmpUserDetail = userDetail;
        }
        if (tmpUserDetail.email && tmpUserDetail.email !== '') {
            let tempUserRequest = createUserRequest(tmpUserDetail)
            getRecommendationConnections(tempUserRequest);
        }
    }, [userDetail, userRequest])

    const getListClass = () => {
        fetch(process.env.REACT_APP_API_LINK + '/enrollment', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
            let courseList = json.course.map((item) => {return {"value" : item, "label": item }})
            setCoursesList(courseList)
        })
    }

    const getListHobby= () => {
        fetch(process.env.REACT_APP_API_LINK + '/hobbies', { credentials: 'include' })
          .then(response => response.json()) //Arrow function to turn fetched data into json
          .then(json => {
            let hobbiesList = json['hobbies'].map((item) => {return {"value" : item, "label": item }})
            setHobbiesList(hobbiesList)
        }) //Arrow function to get hobbies
    }

    const getRecommendationConnections= (userRequest) => {
        fetch(process.env.REACT_APP_API_LINK + '/user/get_recommendation', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
                },
            body: JSON.stringify(userRequest),
            credentials: 'include'
        })
        .then(response => {
            return response.json()
        })
        .then(json => generateReconmmendation(json))
          // onconsole.log(json));
    }

    const openPreferenceEdit = () => {
        setOpenPreferencePopup(true);
    };
    const submitPreferenceEdit = () => {
        setSelectedCourses(tempSelectedCourses)
        setSelectedHobbies(tempSelectedHobbies)
        let userRequest = createUserRequest(userDetail)
        userRequest.courses = tempSelectedCourses.map((item) => item.value)
        userRequest.tags = tempSelectedHobbies.map((item) => item.value)
       
        setUserRequest(userRequest)
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

    const createUserRequest = (userDetail) => {
        let userRequest = {}
        userRequest = Object.assign(userRequest, userDetail)
        delete userRequest.id
        delete userRequest.date_joined
        delete userRequest.agreement
        return userRequest
    }

    const sendMessageToUser = (userEmail) => {
        props.onConnectionSelect({uid: userEmail.split("@")[0]})
    }
    
    const generateReconmmendation = (json) => {
    // var jsonparse = JSON.parse(jsonstring);
    const RecommendationList = json.map((data) => {
                            return (

                                <div style={{display:"inline"}} key={data.username+"_div"}>
                                    <UserCard img={data.image_url} name={data.username} email={data.email}
                                            course={data.courses[0]} hobby1={data.tags[0]} hobby2={data.tags[1]}
                                            messageHandler={sendMessageToUser}/>

                                </div>
                            )})

        updateRecommendationList(RecommendationList)
                  
    }

    const customeMultiSelectStyle = (maxHeight) =>{
        return {
            menuList: (baseStyles) => ({
                ...baseStyles,
                maxHeight: maxHeight,
                color: 'rgb(0,0,0)'
                })
        }
    } 
        

    return (
        <div style={{width:"100%", height:"100%", overflow:"auto"}} id="rec-container">
            <Drawer
                title="Edit Preference"
                placement="top"
                closable={false}
                open={openPreferencePopup}
                getContainer={false}
                onClose={closePreferenceEdit}
                destroyOnClose={true}
                rootClassName="col-9"
                rootStyle={{left:'25%'}}
            >
                <div className="row col-12 m-0 flex-column" style={{minHeight: '85%'}}>
                    <div>
                        <Title level={5}>Courses</Title>
                        <MultiSelectLargeList
                            placeholder="Type to search"
                            defaultValue={selectedCourses}
                            styles={customeMultiSelectStyle('180px')}
                            options={coursesList}
                            onUpdate={onCoursesFilterSelected}
                            itemHeight={35}
                        />
                    </div>
                    <div>
                        <Title level={5}>Hobbies</Title>
                        <MultiSelectLargeList
                            placeholder="Type to search"
                            defaultValue={selectedHobbies}
                            options={hobbiesList}
                            styles={customeMultiSelectStyle('140px')}
                            onUpdate={onHobbiesFiltereSelected}
                            itemHeight={35}
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
                        <Badge key={item.value + "_badge"} className="me-1" bg="warning" text = "dark">{item.label}</Badge>
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
                    RecommendationList
                    
                }
                </div>
                
            </div>
        </div>
        
        // <div><UserCard img = {cat1} name = "Johnny Depp" course = "Test Course 123" hobby1 = "Test Hobby 123" hobby2 = "Test Hobby 456"/></div>
    )


}

export default GetRecommendation;