import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (<Html className="h-full bg-gray-50" lang="en">
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <Head><title>My page title</title></Head>
        <body className="h-full">
        <Main/>
        <NextScript/>
        </body>
    </Html>)
}
