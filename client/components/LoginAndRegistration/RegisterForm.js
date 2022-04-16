import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import ErrorNotification from "./ErrorNotification";
import Avatar from "./Avatar";
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter()
    const [state, setState] = useState({
        username: "",
        password1: "",
        password2: "",
        avatar: "https://www.linkpicture.com/q/avatar_3.png",
        email: ""
    });

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const [errorMessage, setErrorMessage] = useState("");
    const errorHandler = (message) => {
        setErrorMessage(<ErrorNotification setErrorMessage={setErrorMessage} message={message}/>)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (state.password1 !== state.password2) {
            errorHandler("Passwords don't match")
            return
        }
        const res = await axios.post("http://localhost:3001/register", state)
        if (res.data.success) {
            await router.push("/Login")
        }
        if (res.data.message) {
            errorHandler(res.data.message)
        }
    }

    useEffect(() => {
    }, [state.avatar])

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto"
                        src="/adswatcher.jpeg"
                        alt="Workflow"
                        width="400"
                        height="300"
                    />
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    {errorMessage}
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
                                        required
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
                                        required
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
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirm your Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"/>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500"> Already Have an account ? </span>
                                </div>
                            </div>

                            <Link href="/Login">
                                <button
                                    className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                                    Sign in
                                </button
                                >
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
