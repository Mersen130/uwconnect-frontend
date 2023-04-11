import React, {useState} from "react";
import "../styles/bottomNavBar.css";
import {TeamOutlined, CommentOutlined} from '@ant-design/icons'
function BottomNavBar(props) {
    const [tabSelected, setTabSelected] = useState('message')
    const tabUpdateHanlder = props.tabUpdateHanlder
    const itemSelected = (tabName) => {
        if (tabSelected !== tabName) {
            setTabSelected(tabName)
            tabUpdateHanlder(tabName)
        }
    }

    return(
        <>
            <div className="bottom-bar">
                <nav className="nav-menu-bar">
                    <div className="slide-bar" style={{transform: tabSelected === 'friends' ? 'translateX(0%)': 'translateX(100%)'}}></div>
                    <a href="#" className={(tabSelected === 'friends' ? 'active ': '') + 'nav-link-bar'} data-index="0" onClick={() => {itemSelected('friends')}}>
                        <i className="material-icons-bar md-18">
                            <TeamOutlined/>
                        </i>
                        <span className="nav-text-bar">Friends</span>
                    </a>
                    <a href="#" className={(tabSelected === 'message' ? 'active ': '') + 'nav-link-bar'} data-index="1" onClick={() => {itemSelected('message')}}>
                        <i className="material-icons-bar md-18">
                            <CommentOutlined/>
                        </i>
                        <span className="nav-text-bar">Message</span>
                    </a>
                </nav>
            </div>
        </>
    )
}

export default BottomNavBar;