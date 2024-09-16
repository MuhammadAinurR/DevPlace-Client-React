import { useState } from "react"
import request from "../utils/axios";
import showToast from "../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default () => {
    const [data, setData] = useState({ email: 'nini@mail.com', password: 'nini1234', username: 'nini' })
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
                url: 'users/register',
                method: 'post',
                data: { username: data.username, email: data.email, password: data.password }
            })
            showToast({ message: response.message, type: 'success' })
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('email', response.email)
            localStorage.setItem('username', response.username)
            navigate('/login');
        } catch (error) {
            error.response.data.message.forEach(e => showToast({ message: e }))
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
            localStorage.setItem('username', response.username)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const loginWithGitHub = () => {
        const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
        const redirectURI = 'http://localhost:5173/login';
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    };
    return (
        <div className="bg-[#0E1217] w-screen h-screen p-5 flex flex-col justify-between items-center">
            <p className="text-white text-xl">Dev Place</p>
            <form onSubmit={handleSubmit} className="grid justify-center gap-4 w-[400px]">
                <h1 className="text-white text-center text-2xl font-bold">Sign up</h1>

                {/* Google Login */}
                <div className="flex justify-center items-center w-full">
                    <GoogleLogin
                        size="large"
                        theme="filled_black"
                        width={1000}
                        onSuccess={handleCredentialResponse}
                        onError={() => {
                            showToast({ message: 'Register failed' })
                        }}
                    />;
                </div>

                {/* Github Login */}
                <div className="bg-gray-700 text-white p-2 rounded-md text-center hover:cursor-pointer hover:bg-gray-800" onClick={loginWithGitHub}>Sign Up with GitHub</div>;

                <div className="flex items-center justify-center">
                    <div className="border-t border-[#2D323C] flex-grow"></div>
                    <span className="mx-4 text-[#6A7280] text-xl">or</span>
                    <div className="border-t border-[#2D323C] flex-grow"></div>
                </div>
                <div className="grid gap-4 text-xl">
                    <input id="username" name='username' className="bg-[#20252D] rounded-xl px-5 py-2 text-white text-sm" type="text" placeholder="Username" value={data.username} onChange={handleChange} />
                    <input id="email" name='email' className="bg-[#20252D] rounded-xl px-5 py-2 text-white text-sm" type="text" placeholder="Email" value={data.email} onChange={handleChange} />
                    <input id="password" name='password' className="bg-[#20252D] rounded-xl px-5 py-2 text-white text-sm" type="password" placeholder="Password" value={data.password} onChange={handleChange} />
                </div>
                <p className="text-[#CED6E5]">Your email will be used to send you product and community updates</p>
                <div className="border-t border-[#2D323C] flex-grow"></div>
                <div className="flex gap-2 items-center">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                    <p className="text-[#A8B3CF]">I don't want to receive updates and promotion via email</p>
                </div>
                <div className="border-t border-[#2D323C] flex-grow"></div>
                <button type="submit" className="bg-white px-14 py-2 rounded-xl font-bold">Sign up</button>

                <div className="border-t border-[#2D323C] flex-grow"></div>
                <p className="text-[#A8B3CF] text-center mt-5">Already using dev space? <Link to='/login' className="text-white underline hover:cursor-pointer">Log in</Link></p>
            </form>
            <div className="flex justify-center gap-3 font-light text-xs text-[#A8B3CF] text-center">
                <p>@ 2024 Dev Place Ltd.</p>
                <p>Guidelines</p>
                <p>Explore</p>
                <p>Tags</p>
                <p>Sources</p>
                <p>Squads</p>
                <p>Leaderboard</p>
            </div>
        </div>
    )
}