import { useState, useEffect } from "react";
import { Menu } from 'antd'
import Link from 'next/link';
import {
    AppstoreAddOutlined,
    LoginOutlined,
    UserAddOutlined
} from '@ant-design/icons'
 

const { Item } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("")

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        console.log(window.location.pathname)

    }, [process.browser && window.location.pathname])

    console.log('current*********', current)
    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                key="/"
                onClick={e => setCurrent(e.key)}
                icon={<AppstoreAddOutlined />}>
                <Link href='/'>
                    <a>
                        App
                    </a>
                </Link>
            </Item>

            <Item
                key="/login"
                onClick={e => setCurrent(e.key)}
                icon={<LoginOutlined />}>
                <Link href='/login'>
                    <a>
                        Login
                    </a>
                </Link>
            </Item>

            <Item
                key="/register"
                onClick={e => setCurrent(e.key)}
                icon={<UserAddOutlined />}>
                <Link href='/register'>
                    <a>
                        Regsiter
                    </a>
                </Link>
            </Item>
        </Menu>

    )
}

export default TopNav;