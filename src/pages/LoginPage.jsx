import { useEffect, useState } from "react"
import request from "../utils/axios";
import showToast from "../utils/toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { setUsername } from "../userSlice";

export default () => {
    const dispatch = useDispatch();
    const { search } = useLocation()
    useEffect(() => {
        if (search && search.split('=')[1]) {
            const login = async () => {
                try {
                    const { data: response } = await request({
                        url: 'users/github-login',
                        method: 'post',
                        data: { githubToken: search.split('=')[1] }
                    })
                    showToast({ message: response.message, type: 'success' })
                    localStorage.setItem('token', response.access_token)
                    localStorage.setItem('email', response.email)
                    dispatch(setUsername(response.username))
                    navigate('/');
                } catch (error) {
                    showToast({ message: error.response?.data?.message });
                }
            }
            login();
        }
    }, [])

    const [data, setData] = useState({ email: 'visitor@gmail.com', password: 'visitor1234' })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data: response } = await request({
                url: 'users/login',
                method: 'post',
                data: { email: data.email, password: data.password }
            })
            showToast({ message: response.message, type: 'success' })
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('email', response.email)
            dispatch(setUsername(response.username))
            navigate('/');
        } catch (error) {
            console.log(error)
            showToast({ message: error.response?.data?.message || error.message, color: "error" });

        }
    }

    const handleCredentialResponse = async ({ credential }) => {
        try {
            const { data: response } = await request({
                method: 'POST',
                url: 'users/google-login',
                data: { googleToken: credential }
            })
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('email', response.email)
            dispatch(setUsername(response.username))
            showToast({ message: response.message, type: 'success' })
            navigate('/')
        } catch (error) {
            showToast({ message: 'Login failed' })
        }
    }

    useGoogleOneTapLogin({
        onSuccess: handleCredentialResponse,
        onError: () => {
            showToast({ message: 'Login failed' })
        },
    });

    const loginWithGitHub = () => {
        const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectURI = 'http://localhost:5173/login';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    };

    return (
        <div className="bg-[#0E1217] w-screen h-screen p-5 flex flex-col justify-between">
            <p className="text-white text-xl">Dev Place</p>
            <form onSubmit={handleSubmit} className="grid w-full justify-center gap-4">
                <h1 className="text-white text-center text-2xl w-[400px] font-bold">Log in</h1>

                {/* Google Login */}
                <div className="flex justify-center items-center w-full">
                    <GoogleLogin
                        size="large"
                        theme="filled_black"
                        width={1000}
                        onSuccess={handleCredentialResponse}
                        onError={() => {
                            showToast({ message: 'Login failed' })
                        }}
                    />;
                </div>

                {/* Github Login */}
                <div className="bg-gray-700 text-white p-2 rounded-md text-center hover:cursor-pointer hover:bg-gray-800" onClick={loginWithGitHub}>Login with GitHub</div>;

                <div className="flex items-center">
                    <div className="border-t border-[#2D323C] flex-grow"></div>
                    <span className="mx-4 text-[#6A7280] text-xl">or</span>
                    <div className="border-t border-[#2D323C] flex-grow"></div>
                </div>

                <div className="grid gap-4 text-xl">
                    <input id="email" name='email' className="bg-[#20252D] rounded-md px-5 py-2 text-white text-sm" type="text" placeholder="Email" value={data.email} onChange={handleChange} />
                    <input id="password" name='password' className="bg-[#20252D] rounded-md px-5 py-2 text-white text-sm" type="password" placeholder="Password" value={data.password} onChange={handleChange} />
                </div>
                <div className="flex justify-between items-center my-3">
                    <p className="text-[#A8B3CF] font-normal underline">Forgot password?</p>
                    <button type="submit" className="bg-white px-14 py-2 rounded-md font-bold">Log in</button>
                </div>

                <div className="border-t border-[#2D323C] flex-grow"></div>
                <p className="text-[#A8B3CF] text-center">Not a member yet? <Link to='/register' className="text-white underline hover:cursor-pointer">Sign up</Link></p>
            </form>
            <div className="flex justify-center gap-3 font-light text-xs">

                <p className="text-[#A8B3CF] text-center">@ 2024 Dev Place Ltd.</p>
                <p className="text-[#A8B3CF] text-center">Guidelines</p>
                <p className="text-[#A8B3CF] text-center">Explore</p>
                <p className="text-[#A8B3CF] text-center">Tags</p>
                <p className="text-[#A8B3CF] text-center">Sources</p>
                <p className="text-[#A8B3CF] text-center">Squads</p>
                <p className="text-[#A8B3CF] text-center">Leaderboard</p>
            </div>
        </div>
    )
}