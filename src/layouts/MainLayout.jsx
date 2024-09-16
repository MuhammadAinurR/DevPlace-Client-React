import { NavLink, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
export default () => {
    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="h-[5%]">
                    <Navbar />
                </div>
                <div className="flex h-[95%]">
                    <div className="w-[13%] bg-[#0F1218] border border-[#2D323C] text-[#A8B3CF] p-5 text-[15px] flex flex-col gap-1">
                        <p>Discover</p>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.24 7.194a24.16 24.16 0 0 1 3.72-3.062m0 0c3.443-2.277 6.732-2.969 8.24-1.46 2.054 2.053.03 7.407-4.522 11.959-4.552 4.551-9.906 6.576-11.96 4.522C1.223 17.658 1.89 14.412 4.121 11m6.838-6.868c-3.443-2.277-6.732-2.969-8.24-1.46-2.054 2.053-.03 7.407 4.522 11.959m3.718-10.499a24.16 24.16 0 0 1 3.719 3.062M17.798 11c2.23 3.412 2.898 6.658 1.402 8.153-1.502 1.503-4.771.822-8.2-1.433m1-6.808a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                            </svg>
                            <NavLink
                                className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                                to='/'
                            >Explore</NavLink>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4" />
                            </svg>
                            <NavLink to='/tags' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Tags</NavLink>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                                <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                            </svg>
                            <p className="hover:text-white hover:bg-[#2D323C]">Source</p>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM4 3 3 2M2 7H1m15-4 1-1m1 5h1M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z" />
                            </svg>
                            <NavLink to='/github-trending' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Github Trending</NavLink>
                        </div>
                        <br />
                        <p>Ai</p>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                            </svg>
                            <p className="hover:text-white hover:bg-[#2D323C]">Chat</p>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 3 6 2V1m5 2 1-1V1M9 7v11M9 7a5 5 0 0 1 5 5M9 7a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H12V6a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 9 7Zm-5 5H1m3 0v2a5 5 0 0 0 10 0v-2m3 0h-3m-9.975 4H2a1 1 0 0 0-1 1v2m13-3h2.025a1 1 0 0 1 1 1v2M13 9h2.025a1 1 0 0 0 1-1V6m-11 3H3a1 1 0 0 1-1-1V6" />
                            </svg>
                            <NavLink to='/code-solver' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Code Solver</NavLink>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                            <NavLink to='/guide' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Guides</NavLink>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
                            </svg>
                            <NavLink to='/code-converter' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Code Language Convert</NavLink>
                        </div>
                        <div className="w-full hover:bg-[#2D323C] flex gap-2">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16.5A2.493 2.493 0 0 1 6.51 18H6.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .921-3.182 2.477 2.477 0 0 1 1.875-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 11 3.5m0 13v-13m0 13a2.492 2.492 0 0 0 4.49 1.5h.01a2.467 2.467 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.479 2.479 0 0 0-1.875-3.344A2.5 2.5 0 0 0 13.5 1 2.5 2.5 0 0 0 11 3.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M19 8.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185" />
                            </svg>
                            <NavLink to='/component-generator' className={({ isActive }) => isActive ? "text-purple-500 hover:text-white" : "hover:text-white"}
                            >Component Generator</NavLink>
                        </div>
                        <br />
                        <p>Activity</p>
                        <div className="flex gap-2 hover:bg-[#2D323C]">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z" />
                            </svg>
                            <p className="hover:text-white hover:bg-[#2D323C] hover:cursor-pointer">Bookmarks</p>
                        </div>
                        <div className="flex gap-2 hover:bg-[#2D323C]">
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3" />
                            </svg>
                            <p className="hover:text-white hover:bg-[#2D323C] hover:cursor-pointer">History</p>
                        </div>

                    </div>
                    <div className="w-[87%] overflow-y-scroll bg-[#0E1217]">
                        <div className="p-20 mx-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}