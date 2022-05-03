import React, {useState} from 'react';
import axios from "axios";

const ContactForm = () => {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e) {
            e.preventDefault()
            const res = await axios.post("http://localhost:3001/contactUs", state)
            if (res.data) {
                if (res.data.success) {
                    alert(res.data.message)
                } else {
                    alert(res.data.message)
                }
            }
    }

    return (

            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-lg font-medium text-gray-900">Send us a message</h3>
                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                            First name
                        </label>
                        <div className="mt-1">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="firstName"
                                id="first-name"
                                autoComplete="given-name"
                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                            Last name
                        </label>
                        <div className="mt-1">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="lastName"
                                id="last-name"
                                autoComplete="family-name"
                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                onChange={handleChange}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                                Phone
                            </label>
                            <span id="phone-optional" className="text-sm text-gray-500">
                      Optional
                    </span>
                        </div>
                        <div className="mt-1">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                aria-describedby="phone-optional"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                            Subject
                        </label>
                        <div className="mt-1">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="subject"
                                id="subject"
                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div className="flex justify-between">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                Message
                            </label>
                            <span id="message-max" className="text-sm text-gray-500">
                      Max. 500 characters
                    </span>
                        </div>
                        <div className="mt-1">
                    <textarea
                        onChange={handleChange}
                        id="message"
                        name="message"
                        rows={4}
                        className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                        aria-describedby="message-max"
                        defaultValue={''}
                    />
                        </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button
                            type="submit"
                            className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
    );
};

export default ContactForm;
