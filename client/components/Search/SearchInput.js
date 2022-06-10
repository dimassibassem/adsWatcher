import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import {classNames} from "../../utils";
import ComboBox from "./ComboBox";
import axios from "axios";

import {useRouter} from 'next/router'
import {useLocalStorage, useStore} from "../../store";
import {tokenValid} from "../../utils/token";
import Link from "next/link";
import ExpandingCards from "../Home/ExpandingCards";
import SearchComboBox from "./SearchComboBox";


export default function SearchInput() {
    const router = useRouter()
    const token = useLocalStorage((store) => store.token)
    const locations = useStore((store) => store.locations)
    const setLocations = useStore((store) => store.setLocations)

    async function setLocationsFun() {
        if (tokenValid(token)) {
            await setLocations()
        } else {
            await router.push('/Login')
        }
    }

    useEffect(() => {
        setLocationsFun().catch(console.error)
    }, [router, setLocations, token])

    const [popularSearches, setPopularSearches] = useState([]);

    async function setPopularSearchesFunc() {
        if (tokenValid(token)) {
            const res = await axios.get("http://localhost:3001/api/popularSearches?all=true")
            setPopularSearches(res.data)
        } else {
            await router.push("/Login")
        }
    }

    useEffect(() => {
        setPopularSearchesFunc().catch(err => console.log(err))
    }, [router, setPopularSearches, token])

    const [agreed, setAgreed] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState()
    const [selectedSearch, setSelectedSearch] = useState('')
    const [state, setState] = useState({
        combo: "",
        maxPrice: "",
        minPrice: "",
        search: "",
    });

    const filtredLocation =
        state.combo === ''
            ? locations
            : locations.filter((location) => {
                return location.name.toLowerCase().includes(state.combo.toLowerCase())
            })
  const filtredSearches =
        state.search === ''
            ? popularSearches
            : popularSearches.filter((search) => {
                return search.query.toLowerCase().includes(state.search.toLowerCase())
            })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post("http://localhost:3001/search", {...state, selectedLocation,selectedSearch}, {
            headers: {Authorization: "Bearer " + token},
        })
        if (res.data.success) {
            await router.push("/Article/" + res.data.searchId)
        }
    }

    return (
        <div className="bg-white py-10 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">

            <div>
                <h1>History</h1>
                <ExpandingCards/>
            </div>

            <div className="relative max-w-xl mx-auto">
                <svg
                    className="absolute left-full transform translate-x-1/2"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"/>
                </svg>
                <svg
                    className="absolute right-full bottom-0 transform -translate-x-1/2"
                    width={404}
                    height={404}
                    fill="none"
                    viewBox="0 0 404 404"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="85737c0e-0916-41d7-917f-596dc7edfa27"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"/>
                </svg>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Get a great
                        deal</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500">
                        We will find for you the desired ADS.
                    </p>
                </div>
                <div className="mt-12">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

                        <div className="sm:col-span-2">
                            <div className="mt-1">

                                <SearchComboBox onChange={handleChange} filtredSearches={filtredSearches}
                                                selectedSearch={selectedSearch} setSelectedSearch={setSelectedSearch}

                                />


                                {/* ComboBox*/}
                                <ComboBox onChange={handleChange} selectedLocation={selectedLocation}
                                          setSelectedLocation={setSelectedLocation} filtredLocation={filtredLocation}/>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mt-1">
                                <div className="sm:col-span-2">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        With Minimum Price
                                    </label>
                                    <div className="mt-1">
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                name="minPrice"
                                                id="minPrice"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            TND
          </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="mt-1">
                                <div className="sm:col-span-2">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        And Maximum Price
                                    </label>
                                    <div className="mt-1">
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                name="maxPrice"
                                                id="maxPrice"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                                className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            TND
          </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="mt-1">
                                <div className="sm:col-span-2">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Switch
                                                checked={agreed}
                                                onChange={setAgreed}
                                                className={classNames(
                                                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span className="sr-only">Agree to policies</span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        agreed ? 'translate-x-5' : 'translate-x-0',
                                                        'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                    )}
                                                />
                                            </Switch>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base text-gray-500">
                                                By selecting this, you agree to the{' '}
                                                <Link href="#" className="font-medium text-gray-700 underline">
                                                    Privacy Policy
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="#" className="font-medium text-gray-700 underline">
                                                    Cookie Policy
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                Let's find best proposals
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
