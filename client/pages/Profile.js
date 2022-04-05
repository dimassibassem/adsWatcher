import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Avatar from "../components/LoginAndRegistration/Avatar";
import ProfileDropdown from "../components/Home/ProfileDropdown";
import {useLocalStorage, useStore} from "../store";
import {parseJwt, tokenValid} from "../utils/token";

export default function Profile() {
    const router = useRouter()
    const token = useLocalStorage(store => store.token)
    const setToken = useLocalStorage(store => store.setToken)
    const setUserData = useStore(store => store.setUserData)
    const userId = parseJwt(token)?.userId
    const [state, setState] = useState({
        username: "",
        password1: "",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F05%2F24%2F770117_people_512x512.png&f=1&nofb=1",
        email: ""
    });

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await axios.put(`http://localhost:3001/updateUser/${userId}`, {
                username: state.username === "" ? null : state.username,
                password1: state.password1 === "" ? null : state.password1,
                avatar: state.avatar === "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F05%2F24%2F770117_people_512x512.png&f=1&nofb=1" ? null : state.avatar,
                email: state.email === "" ? null : state.email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setMessage(res.data.message)
        if (res.data.token) {
            setToken(res.data.token)
        }
    }

    useEffect(async () => {
        if (tokenValid(token)) {
            await setUserData(token)
            console.log(message);
        } else {
            await router.push("/Login")
        }
    }, [token]);

    return (
        <div>
            <header className="w-full">
                <div
                    className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                    <div className="flex-1 flex justify-between px-4 sm:px-6">
                        <div>
                            <img
                                className="mx-auto mt-2"
                                src="/adswatcher.jpeg"
                                alt="Workflow"
                                width="180"
                                height="120"
                            />
                        </div>

                        {/* Profile dropdown */}
                        <ProfileDropdown/>
                    </div>
                </div>
            </header>
            <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Update your Profile</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>


                                {/*Avatar*/}
                                <Avatar setState={setState} state={state}/>

                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        id="password1"
                                        name="password1"
                                        type="password"
                                        autoComplete="current-password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
