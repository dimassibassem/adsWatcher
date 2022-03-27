import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocalStorage} from "../../store";

const LinkButton = ({source, currentFile}) => {
    const [url, setUrl] = useState('');
    const token = useLocalStorage((store) => store.token)
    useEffect(async () => {
        const result = await axios.get('http://localhost:3001/api/getAppData', {headers: {Authorization: "Bearer " + token},})
        const appData = result.data
        const crawlerAdUrls = appData.crawlerAdUrls
        const url = crawlerAdUrls[currentFile.crawlerId].replace(/{id}/g, currentFile.externalId)
        setUrl(url)
    });

    return (
        <div className="flex">
            <button
                type="button"
                className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={url === ''}
                onClick={() => {
                    const win = window.open(url, '_blank');
                    win.focus();
                }}
            >
                <a>
                    See on {source[currentFile.sourceId - 1]?.name}
                </a>
            </button>


        </div>
    );
};

export default LinkButton;
