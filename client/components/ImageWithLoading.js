import React from 'react';
import { StateProvider, ObjectWatcher } from "reenhance-components";
const LoadedState = StateProvider(false);
const ImageRefWatcher = ObjectWatcher(React.createRef());
export const ImageWithLoading = ({ src }) => (
    <LoadedState>
        {({ state: loaded, setState: setLoaded }) => (
            <ImageRefWatcher watch="current">
                {(imageRef) => {
                    const complete = imageRef.current && imageRef.current.complete;
                    return (
                        <div>
                            {!complete ? (
                                <svg width="100" height="100" viewBox="0 0 100 100">
                                    <rect width="100" height="100" rx="10" ry="10" fill="#CCC" />
                                </svg>
                            ) : null}
                            <img
                                src={src}
                                style={!complete ? { visibility: 'hidden' } : {}}
                                ref={imageRef}
                                onLoad={() => setLoaded(true)}
                            />
                        </div>
                    );
                }}
            </ImageRefWatcher>
        )}
    </LoadedState>
);
