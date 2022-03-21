import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {classNames} from "../../utils";
import {useLocalStorage} from "../../store";
import axios from "axios";
import {parseJwt} from "../../utils/token";
import {router} from "next/client";

const ProfileDropdown = ({userNavigation}) => {
    const token = useLocalStorage(store => store.token);
    const setToken = useLocalStorage(store => store.setToken);



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
            const res = await axios.get(`http://localhost:3001/api/users/${decodedToken.userId}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("from Function userInfo:  "+res.data.avatarUrl);
            return res.data;
        }
    }
    let profileAvatar = userData?.avatarUrl ? userData.avatarUrl : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F05%2F24%2F770117_people_512x512.png&f=1&nofb=1";

    return (
        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={async () => {
                    setToken(null);
                    await router.push("/Login")
                }}
            >
                logout
            </button>
            <Menu as="div" className="relative flex-shrink-0">
                <div>
                    <Menu.Button
                        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-12 w-12 rounded-full"
                            src={profileAvatar}
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
