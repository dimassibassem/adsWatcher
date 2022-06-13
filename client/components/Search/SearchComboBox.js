
import { CheckIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import {classNames} from "../../utils";

export default function SearchComboBox({filtredSearches,onChange,selectedSearch,setSelectedSearch,searchWritten}) {
    return (
        <Combobox as="div" value={selectedSearch} onChange={setSelectedSearch} className="pb-5">
            <Combobox.Label className="block text-sm font-medium text-gray-700">I am Searching for</Combobox.Label>
            <div className="relative mt-1">
                <Combobox.Input
                    name="search"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    onChange={onChange}
                    displayValue={(search) => {
                        if (search) {
                            return search.query
                        } else {
                            return searchWritten
                        }
                    }}
                    value={(search) => search.query}
                />

                {filtredSearches.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filtredSearches.map((search) => (
                            <Combobox.Option
                                key={search.query}
                                value={search}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{search.query}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}
