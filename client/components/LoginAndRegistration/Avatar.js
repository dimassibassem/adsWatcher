export default function Avatar({setState, state}) {

    const fileSelectedHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setState({
                    ...state,
                    avatar: reader.result
                })
            }
        }
        reader.readAsDataURL(event.target.files[0]);
    }
    return (

        <div className="mt-2 flex flex-col lg:flex-row">
            <div className="flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                <div className="lg:hidden">
                    <div className="flex items-center">
                        <div
                            style={{height: 140, width: 140}}
                            className="flex-shrink-0 inline-block rounded-full overflow-hidden ml-10"
                            aria-hidden="true"
                        >
                            <img className="rounded-full h-full w-full" src={state.avatar} alt=""/>
                        </div>
                        <div className="ml-5 rounded-md shadow-sm">
                            <div
                                className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                <label
                                    htmlFor="mobile-user-photo"
                                    className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                >
                                    <span>Change</span>
                                    <span className="sr-only"> user photo</span>
                                </label>
                                <input
                                    id="mobile-user-photo"
                                    name="avatar"
                                    type="file"
                                    className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                    onChange={fileSelectedHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden relative rounded-full overflow-hidden lg:block ml-10">
                    <img className="relative rounded-full w-40 h-40" src={state.avatar} alt=""/>
                    <label
                        htmlFor="desktop-user-photo"
                        className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                    >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                        <input
                            type="file"
                            id="desktop-user-photo"
                            name="avatar"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            onChange={fileSelectedHandler}
                        />
                    </label>
                </div>
            </div>
        </div>



        // <div className="mt-6 flex flex-col lg:flex-row">
        //     <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
        //         <p className="text-sm font-medium text-gray-700" aria-hidden="true">
        //             Avatar
        //         </p>
        //         <div className="mt-1 lg:hidden">
        //             <div className="flex items-center">
        //                 <div
        //                     className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
        //                     aria-hidden="true"
        //                 >
        //                     <img id="img" className="rounded-full h-full w-full"
        //                          src={state.avatar} alt=""/>
        //                 </div>
        //                 <div className="ml-5 rounded-md shadow-sm">
        //                     <div
        //                         className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
        //                         <label
        //                             htmlFor="mobile-user-photo"
        //                             className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
        //                         >
        //                             <span>Add Avatar</span>
        //                             <span className="sr-only"> user photo</span>
        //                         </label>
        //                         <FileBase id="mobile-user-photo"
        //                                   name="avatar" type="file" multiple={false}
        //                                   className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
        //                                   onDone={({base64}) => setState({
        //                                       ...state,
        //                                       avatar: base64
        //                                   })}/>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div className="hidden relative rounded-full overflow-hidden lg:block">
        //             <img className="relative rounded-full w-40 h-40" src={state.avatar} alt=""/>
        //             <label
        //                 htmlFor="desktop-user-photo"
        //                 className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
        //             >
        //                 {/*<span>Change</span>*/}
        //                 <span className="sr-only">Avatar</span>
        //
        //                 {/*<input*/}
        //                 {/*    type="file"*/}
        //                 {/*    id="desktop-user-photo"*/}
        //                 {/*    name="avatar"*/}
        //                 {/*    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"*/}
        //                 {/*/>*/}
        //
        //                 <FileBase type="file"
        //                           id="desktop-user-photo"
        //                           name="avatar" multiple={false}
        //                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
        //                           onDone={({base64}) => setState({...state, avatar: base64})}/>
        //
        //             </label>
        //         </div>
        //     </div>
        // </div>

    )
}
