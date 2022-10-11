import { useState, useEffect, useContext } from "react";
import { Menu } from 'antd'
import Link from 'next/link';
import {
    AppstoreAddOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { Context } from '../context';



const { Item } = Menu;

const TopNav = () => {
    const [current, setCurrent] = useState("")
    const { state, dispatch } = useContext(Context)
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
        console.log(window.location.pathname)

    }, [process.browser && window.location.pathname])

    const logout = async () => {
        dispatch({
            type: "LOGOUT",
        }),
            window.localStorage.removeItem("user");
        const { data } = await axios.get('/api/logout')
        toast(data.message)
        router.push('/login')

    }
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

            <Item className="float-right" onClick={logout} icon={<LogoutOutlined />}>
                Logout
            </Item>
        </Menu>

    )
}

export default TopNav;