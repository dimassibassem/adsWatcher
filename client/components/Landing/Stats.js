/* This example requires Tailwind CSS v2.0+ */
import {ArrowSmDownIcon, ArrowSmUpIcon} from '@heroicons/react/solid'
import {
    UsersIcon,
    GlobeIcon,
    LocationMarkerIcon,
    CollectionIcon, SearchIcon, NewspaperIcon, PlusIcon
} from '@heroicons/react/outline'
import React from "react";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Stats({count}) {
    const stats = [
        {id: 1, name: 'Websites & Groups', stat: count.sources, icon: GlobeIcon},
        {id: 2, name: 'Different location', stat: count.locationCount, icon: LocationMarkerIcon},
        {id: 3, name: 'Categories', stat: count.categoryCount, icon: CollectionIcon}
        ]
    const fourColumnsStats = [
        {id: 4, name: 'Total Subscribers', stat: count.subscriberCount, icon: UsersIcon, change: count.weekAgoSubscriberCount, changeType: 'increase'},
        {id: 5, name: 'Researches', stat: count.searchCount, icon: SearchIcon, change: count.weekAgoSearchCount, changeType: 'increase'},
        {id: 6, name: 'Ads', stat: count.adsCount, icon: NewspaperIcon, change: count.dayAgoAdsCount, changeType: 'increase'},
        {id: 7, name: 'Added Ads Last Week', stat: count.weekAgoAdsCount, icon: PlusIcon, change: count.adsAddedWeekAgoPercentage, changeType: 'increase'},
    ]
    return (
        <div className="mt-5">
            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide pb-10 ">
                adsWatcher Statistics
            </p>
            <div>
                <dl className=" grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow-xl rounded-lg overflow-hidden"
                        >
                            <dt>
                                <div className="absolute bg-indigo-500 rounded-md p-3">
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </div>
                            </dt>
                            <dd className="ml-11 pb-6 flex items-baseline sm:pb-7 mt-2">
                                <p className="text-2xl font-semibold text-gray-900 ml-6">{item.stat}</p>
                                <p className="ml-6 text-xl font-medium text-gray-500 truncate ">{item.name}</p>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {fourColumnsStats.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow-xl rounded-lg overflow-hidden"
                        >
                            <dt>
                                <div className="absolute bg-indigo-500 rounded-md p-3">
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </div>
                                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                            </dt>
                            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                <p
                                    className={classNames(
                                        item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                        'ml-2 flex items-baseline text-sm font-semibold'
                                    )}
                                >
                                    {item.changeType === 'increase' ? (
                                        <ArrowSmUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                                                       aria-hidden="true"/>
                                    ) : (
                                        <ArrowSmDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                                                         aria-hidden="true"/>
                                    )}

                                    <span
                                        className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                    {item.change}
                                </p>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

