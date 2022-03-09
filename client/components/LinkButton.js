import React, {useEffect, useState} from 'react';
import {decode} from '../../server/functions'
import axios from "axios";

const LinkButton = ({source, currentFile}) => {
    const [url, setUrl] = useState('');
    useEffect(async () => {
        const result = await axios.get('http://localhost:3001/api/getAppData')
        const appData = result.data
        const decodedAppData = decode(appData, 4)
        const crawlerAdUrls = decode(decodedAppData.cau, 3)
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
                    See on {source[currentFile.sourceId].name}
                </a>
            </button>


        </div>
    );
};

export default LinkButton;
