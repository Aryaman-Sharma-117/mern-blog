import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'

export default function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const {theme} = useSelector(state=>state.theme)
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)
    const handleToggle = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    }
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-center whitespace-nowrap text-sm font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    MERN
                </span>
                BLOG
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch/>
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                    {theme === 'dark' ? <FaSun/> : <FaMoon/>}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
                        <Dropdown.Header>
                           <span className='block text-sm'>@{currentUser.username}</span>
                           <span className='block text-sm truncate font-medium'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item >Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) :
                    (
                    <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Sign-in
                    </Button>
                    </Link>
                    )
                }

                
                <Navbar.Toggle onClick={handleToggle}/>
            </div>
            <Navbar.Collapse className={`flex lg:items-center lg:w-auto ${isNavbarCollapsed ? 'hidden' : 'block'}`}>
                    <Navbar.Link active={path==="/"} as={'div'}>
                        <Link to='/' style={{ marginRight: '10px' }}>
                            Home
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path==="/about"} as={'div'}>
                        <Link to='/about' style={{ marginRight: '10px' }}>
                            About
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path==="/projects"} as={'div'}>
                        <Link to='/projects' style={{ marginRight: '10px' }}>
                            Projects
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>
      )
}
