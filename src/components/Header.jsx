import React from 'react'
import { DownOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import  { Avatar, Dropdown, Space, message  } from 'antd';
import { persistor } from '../redux/store'

import logo from '../images/login_logo.png';
import { useSelector } from 'react-redux';


const items = [
  {
    key: '1',
    label: "Profile",
    icon: < ProfileOutlined />
  },
  {
    key: '2',
    danger: true,
    label: "Sign out",
    icon: < LogoutOutlined />
  },
];

const handleMenuClick = ({ key }, email ) => {
    if (key === "1") {
        window.location.href = '/modifyprofile';
    }
    if (key === "2") {
        // clear all redux states
        fetch(process.env.REACT_APP_API_LINK + '/user/logout', {
            // fetch('http://localhost:5000/user/validate', {
            credentials: 'include',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                email: email,
            })
        })
        .then(response => {
            if (response.status === 200){
                persistor.purge()
                window.location.href = '/'
            }
        })
    }
  };

function Header() {
    const email = useSelector((state) => state.user.email)
    const avatar = useSelector((state) => state.user.image_url)
    const displayName = useSelector((state) => state.user.first_name + ' ' + state.user.last_name)

    return (
        <div className='row' style={{height: '5vh', backgroundColor: 'rgba(0,0,0,0.9)', color: '#FFFFFF'}}>
            <div className='col-12 d-flex flex-row'>
                <div className='col-4 d-flex' style={{maxHeight: '50px', flex: '1'}}>
                    <Avatar className='my-auto' size={30} src={<img src={logo} alt="" />} />
                    <span className='fs-5 fw-bold my-auto'>UW Connect</span>
                </div>
                {email && <div className='col-4 d-flex pe-2' style={{alignSelf: 'center', justifyContent: 'flex-end'}}>
                    <span className='fs-5 fw-bold my-auto'>
                        <Dropdown
                            menu={{
                                items,
                                onClick: (e) => handleMenuClick(e, email)
                            }}
                            >
                            <a onClick={(e) => e.preventDefault()} style={{textDecoration:'none'}}>
                            <Space>
                                <Avatar className='my-auto mr-2' shape="square" size={30} src={<img src={avatar} alt="" />} />
                                <span style={{color: 'rgba(255,255,255,1)', fontSize: 'medium', fontWeight: 500}}>
                                    {displayName}
                                </span>
                            </Space>
                            </a>
                        </Dropdown>
                    </span>
                </div>}
            </div>
        </div>
    )
}

export default Header
