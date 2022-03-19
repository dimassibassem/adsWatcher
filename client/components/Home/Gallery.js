import React from 'react';
import {classNames} from "../../utils";
import {useLocalStorage, useStore} from '../../store';

const Gallery = () => {
    const token = useLocalStorage(store => store.token)
    const setCurrentFile = useStore(state => state.setCurrentFile);
    const setMoreImages = useStore(state => state.setMoreImages);
    const files = useStore(state => state.files);

    return (
        <div>
            <section className="mt-8 pb-16 t" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading" className="sr-only">
                    Recently viewed
                </h2>
                <ul
                    role="list"
                    className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-10"
                >
                    {files.map((file, index) => (
                        <li key={file.id} className="relative ">
                            <div
                                className={classNames(
                                    file.current
                                        ? 'ring-2 ring-offset-2 ring-indigo-500'
                                        : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                                    'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                                )}
                            >
                                <img
                                    src={file.thumbnail}
                                    alt=""
                                    className={classNames(
                                        file.current ? '' : 'group-hover:opacity-75',
                                        'object-cover pointer-events-none'
                                    )}
                                />


                                <button type="button"
                                        className="absolute inset-0 focus:outline-none"
                                        onClick={async () => {
                                            setCurrentFile(index)
                                            await setMoreImages(file, token)
                                        }}>

                                    <span className="sr-only">View details for {file.title}</span>
                                </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {file.title}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.price} TND</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Gallery;
