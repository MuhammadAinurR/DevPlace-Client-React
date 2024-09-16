import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const username = useSelector((state) => state.user.username)
    const nav = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const menuRef = useRef(null); // Reference to the dropdown menu
    const buttonRef = useRef(null); // Reference to the user menu button
    const searchInputRef = useRef(null); // Reference to the search input

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Close the menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle search query
    useEffect(() => {
        nav("/?search=" + search);
    }, [search, nav]);

    // Handle keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if the Command (Mac) or Ctrl (Windows/Linux) key and K key are pressed
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault(); // Prevent the default browser action
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        nav('/login');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        nav("/?search=" + search);
    };

    return (
        <div className='sticky top-0'>
            <nav className="bg-[#0F1218] h-[6vh]">
                <div className="w-full px-5">
                    <div className="relative grid grid-cols-3 items-center h-12 pt-2">

                        {/* Logo */}
                        <Link to='/' className="text-[#FFFFFF] text-lg font-bold">Dev <span className='font-extralight text-[#A9AAAB]'>Place</span></Link>

                        {/* Search  */}
                        <div className='flex justify-center'>
                            <form className="w-[300px]" onSubmit={handleSearch}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input
                                        name='search'
                                        type="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        id="default-search"
                                        className="block w-full p-1 ps-10 text-sm rounded-lg bg-[#1D1F25] autofill:bg-[#1D1F25] outline-none border text-white border-transparent focus:border-[#383D48]"
                                        placeholder="Quick Search...                              ⌘ + K"
                                        ref={searchInputRef} // Attach the ref here for command k or ctrl k pliss eeellppp
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Login / Menu */}
                        <div className='flex justify-end'>
                            {!localStorage.getItem('token') ?
                                <Link to='/login' className='text-white'>Login</Link>
                                :
                                <div className="flex items-center sm:static sm:inset-auto">
                                    <p className="text-gray-100 hidden md:block">{username}</p>
                                    <div className="relative ml-3 bg-[#1D1F24]">
                                        <button
                                            type="button"
                                            className="relative flex rounded-md bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D1F24] focus:ring-offset-2 focus:ring-offset-gray-800"
                                            onClick={toggleMenu}
                                            aria-expanded={isMenuOpen}
                                            aria-haspopup="true"
                                            ref={buttonRef}
                                        >
                                            <span className="absolute -inset-1.5"></span>
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-md"
                                                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                                                alt="User Avatar"
                                            />
                                        </button>

                                        <div
                                            ref={menuRef}
                                            className={`text-[#A8B3CF] absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#17191E] border border-[#333842] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMenuOpen ? '' : 'hidden'}`}
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu-button"
                                            tabIndex="-1"

                                        >
                                            <NavLink
                                                to="/post"
                                                className="block px-4 py-2 text-sm hover:text-[#FFFFFF] hover:bg-[#282C34]"
                                                role="menuitem"
                                                tabIndex="-1"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Post Somehing?
                                            </NavLink>
                                            <NavLink
                                                to="/?myPosts=true"
                                                className="block px-4 py-2 text-sm hover:text-[#FFFFFF] hover:bg-[#282C34]"
                                                role="menuitem"
                                                tabIndex="-1"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                My Posts
                                            </NavLink>
                                            <NavLink
                                                to="/"
                                                className="block px-4 py-2 text-sm hover:text-[#FFFFFF] hover:bg-[#282C34]"
                                                role="menuitem"
                                                tabIndex="-1"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Explore
                                            </NavLink>
                                            <NavLink
                                                to="/tags"
                                                className="block px-4 py-2 text-sm hover:text-[#FFFFFF] hover:bg-[#282C34]"
                                                role="menuitem"
                                                tabIndex="-1"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                All Categories
                                            </NavLink>

                                            <a
                                                className="block px-4 py-2 text-sm hover:text-[#FFFFFF] hover:bg-[#282C34] hover:cursor-pointer"
                                                role="menuitem"
                                                tabIndex="-1"
                                                id="user-menu-item-2"
                                                onClick={handleLogout}
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>

            </nav>
            <div className="border-t border-[#2D323C] flex-grow"></div>
        </div>
    );
};

export default Navbar;
