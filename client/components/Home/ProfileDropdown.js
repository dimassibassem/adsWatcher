import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {classNames} from "../../utils";
import {useLocalStorage} from "../../store";
import axios from "axios";

const ProfileDropdown = ({userNavigation}) => {
    const token = useLocalStorage(store => store.token);

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const [decodedToken, setDecodedToken] = useState(null);
    const [userData, setUserData] = useState({});
    useEffect(async () => {
        setDecodedToken(parseJwt(token));
    }, [token]);

    useEffect(async () => {
        setUserData(await userInfo())
    }, [decodedToken]);

    const userInfo = async () => {
        if (decodedToken) {
            const res = await axios.get(`http://localhost:3001/api/users/${decodedToken.userId}`);
            console.log("from Function userInfo:  "+res.data.avatarUrl);
            return res.data;
        }
    }


    return (
        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            <Menu as="div" className="relative flex-shrink-0">
                <div>
                    <Menu.Button
                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-11 w-11 rounded-full"
                            src={userData?.avatarUrl}
                            alt=""
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                                {({active}) => (
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default ProfileDropdown;
