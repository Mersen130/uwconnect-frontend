import { CometChat } from "@cometchat-pro/chat";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CometChatUI, CometChatMessages, CometChatConversationList, CometChatUserList } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { Button } from "antd";
import { WifiOutlined } from '@ant-design/icons'
import GetRecommendation from '../../components/Recommendation'
import styles from'../../styles/home.css'
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/profile/profileSlice";
import BottomNavBar from "../../components/BottomNavBar";
import Popup from "../../components/UserWarningPopUp"

const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;

const Home = () => {
    const dispatch = useDispatch();
    const [uid, setUid] = useState(null);
    const [userData, setUserData] = useState(null);
    const [conversationIdMap, setConversationIdMap] = useState(new Map());
    const [openConnection, setOpenConnection] = useState(false);
    const [renderCometChat, setRenderCometChat] = useState(false);
    const [selectedMessageTab, setSelectedMessageTab] = useState('message');
    const [friends, setFriends ] = useState([])
    const [popupWarning, setPopupWarning ] = useState(false);
    const email = useSelector((state) => state.auth.email);
    
    // let appID = process.env.REACT_APP_COMETCHAT_APPID;
    // const region = "us";
    // let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    useEffect(() => {
        if (email) {
            getUserDetail();
            console.log("trying to init cometchat", email.split("@")[0])
            CometChat.login(email.split("@")[0], authKey).then((user) => {
                if(user) {
                    console.log('CometChat Login successful')
                    setRenderCometChat(true)
                }
            }).catch(error => {
                console.log('CometChatLogin Failed', error);
                setRenderCometChat(false)
            })

            getFriendList(email)


        }

        setUid(email.split("@")[0]);
    },[email])


    const getUserDetail = () => {
        fetch(process.env.REACT_APP_API_LINK + `/user/profile?email=${encodeURIComponent(email)}`, { credentials: 'include' })
        .then(response => response.json())
        .then(user => {
            setUserData(user)
            dispatch(setUser(user))
        })
    } 

    const getFriendList = (me) => {
        console.log("getFriendList")
        fetch(process.env.REACT_APP_API_LINK + `/user/friends?email=${encodeURIComponent(me)}`, { credentials: 'include' })
        .then(response => response.json())
        .then(resp => {
            if (!arrayEquals(resp.emails, friends)){
                setFriends(resp.emails)
            }
        })
    }

    const handleConversationSelect = (conversationWith, conversationType) => {
        getFriendList(email)
        for (let [key, value] of conversationIdMap) { 
            conversationIdMap.set(key, false)
        }
        setConversationIdMap(new Map(conversationIdMap.set(conversationWith.uid, true)))
        setOpenConnection(false)
    }

    const openConnectionPage = () => {
        setOpenConnection(!openConnection)
    }

    const tabSelected = (tabName) => {
        if (selectedMessageTab !== tabName) {
            setSelectedMessageTab(tabName)
        }
    }

    return (
        <div className="position-fixed" style={{inset: '0', top: '5vh'}}>
            {renderCometChat && 
                <div className="col-12 d-flex" style={{height: '95vh'}}>
                    <div className="col-3 h-100 align-self-end d-flex flex-column" style={{backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'stretch'}}>
                        <div className="d-flex align-item-center pb-1" style={{height: '80px'}}>
                            <Button type="primary" className="connect-me-button h-100 m-auto w-100" icon={<WifiOutlined style={{ fontSize: '150%'}} />} 
                            onClick={openConnectionPage}>
                                    Connect Me
                            </Button>
                        </div>
                        <div className="row m-0" style={{flex: 1, maxHeight: 'calc(95vh - (80px + 60px))'}}>
                            {selectedMessageTab === 'message' && <CometChatConversationList onItemClick={handleConversationSelect}/>}
                            {selectedMessageTab === 'friends' && <CometChatUserList friendsOnly={true} onItemClick={handleConversationSelect}/>}
                        </div>
                        <div className="row d-flex m-0">
                            <BottomNavBar tabUpdateHanlder={tabSelected} />
                        </div>
                    </div>
                    { !openConnection && renderCometChat &&
                        [...conversationIdMap.keys()].map(k => (
                            conversationIdMap.get(k) && <div className="col-9 h-100">
                                {friends && !friends.includes(k + "@uwaterloo.ca") && <Popup title={"Friend Alert"} body={"You are not friends, you can maximally send 1 message before the other responded, if the other doesn't respond within 24 hours, this conversation will be deleted. If this is a message that you received from stranger, reply back within 24 hours to become friends!"}/>}
                                <CometChatMessages chatWithUser={k}/>
                            </div>
                        ))
                        
                    }
                    <div className="col-9 h-100" style={{display: openConnection ? 'block': 'none', zIndex:1, backgroundColor: '#282c34'}}>
                         <GetRecommendation onConnectionSelect={handleConversationSelect}/>
+                   </div>
                    
                </div>
            }
             
         </div>
    );

    }


export default Home;