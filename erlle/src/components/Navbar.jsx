import { useState, useEffect, useRef } from 'react';
import logo from '../assets/erlleLogo.png'; // Ensure this path is correct
import { FaXmark, FaBars } from 'react-icons/fa6';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { link: "About", path: "about" }
    ];

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 p-2 max-w-screen-2xl mx-auto text-primary bg-[#1e1d1d] z-50 md:pt-8 pt-4'>
                <div className='text-lg container mx-auto flex justify-between md:justify-around items-center font-medium'>
                    <div className='flex space-x-14 items-center'>
                        <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                            <img src={logo} alt="Erlle Logo" className='w-28' />
                        </a>
                    </div>
                    <div className='space-x-12 hidden md:flex items-center'>
                        <ul className='flex space-x-12'>
                            {navItems.map(({ link, path }) => (
                                <ScrollLink
                                    key={link}
                                    to={path}
                                    activeClass='active'
                                    spy
                                    smooth
                                    offset={-100}
                                    className='block hover:text-gray-300 cursor-pointer'
                                >
                                    {link}
                                </ScrollLink>
                            ))}
                        </ul>
                    </div>
                    <div className='md:hidden'>
                        <button
                            onClick={toggleMenu}
                            className='text-white focus:ring-offset-blue-950 focus:text-gray-300'
                        >
                            {isMenuOpen ? (
                                <FaXmark className='w-6 h-6 text-primary'/>
                            ) : (
                                <FaBars className='w-6 h-6 text-primary'/>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div
                ref={menuRef}
                className={`fixed top-0 left-0 right-0 border-b bg-[#1e1d1d] border-white space-y-4 px-4 pt-16 pb-5 text-xl ${isMenuOpen ? "block" : "hidden"} z-50`}
            >
                {navItems.map(({ link, path }) => (
                    <ScrollLink
                        key={link}
                        to={path}
                        activeClass='active'
                        spy
                        smooth
                        offset={-80}
                        className='block text-white hover:text-gray-300 cursor-pointer'
                        onClick={closeMenu}
                    >
                        {link}
                    </ScrollLink>
                ))}
            </div>
        </>
    );
};

export default Navbar;
