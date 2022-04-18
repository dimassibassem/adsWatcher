import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {classNames} from "../../utils";
import {useLocalStorage, useStore} from "../../store";


const ProfileDropdown = () => {
    const userNavigation = useStore(store => store.userNavigation)
    const setToken = useLocalStorage(store => store.setToken);

    const userData = useStore(store => store.userData);

    let profileAvatar = userData?.avatarUrl ? userData.avatarUrl : "https://www.linkpicture.com/q/avatar_3.png";

    return (
        <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">

            <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">Welcome {userData?.username}</span>
            </span>
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
                        {/*todo: change <a> to Link tag handling css*/}
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                                {({active}) => (
                                    <a
                                        href={item.href}
                                        onClick={() => {
                                            if (item.name === "Sign out") {
                                                setToken(null);
                                            }
                                        }}
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
