import NarrowSidebar from "../components/NarrowSidebar";
import ContentArea from "../components/ContentArea";
import create from 'zustand'
import {devtools} from 'zustand/middleware'
import axios from "axios";
import {useEffect} from "react";


const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]
const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]

const timestamp = new Date(1645804485 * 1000);
let month = timestamp.getMonth() + 1;
let year = timestamp.getFullYear();
let date = timestamp.getDate();
let categoryDisplayNames = {
    '1': 'Auto & Moto',
    '2': 'Électronique & Multimédia',
    '3': 'Immobilier',
    '4': 'Maison & Jardin',
    '5': 'Mode & Beauté',
    '6': 'Bébé & Enfant',
    '7': 'Loisirs & Sport',
    '8': 'Animaux',
    '9': 'Emploi',
    '10': 'Services',
    '11': 'Cours & Formations',
    '12': 'Matériel Professionnel',
    '13': 'Autres'
}
let source = {
    '1': {name: 'Tunisie Annonce', hasLargeImages: true, hasPrice: true},
    '2': {name: 'Tayara', hasLargeImages: true, hasPrice: true},
    '3': {name: 'Ballouchi', hasLargeImages: true, hasPrice: true},
    '4': {name: 'Facebook', hasLargeImages: true, hasPrice: true},
    '5': {name: 'Ahaya', hasLargeImages: true, hasPrice: true},
    '6': {name: 'Tanitjobs', hasLargeImages: false, hasPrice: false},
    '7': {name: 'Afariat', hasLargeImages: true, hasPrice: true},
    '8': {name: 'Tunisiapromo', hasLargeImages: true, hasPrice: true},
    '9': {name: 'Jumia Deals', hasLargeImages: true, hasPrice: true},
    '10': {name: 'DannousTn', hasLargeImages: true, hasPrice: true},
    '11': {name: 'Ijaelhouni', hasLargeImages: true, hasPrice: true},
    '12': {name: 'Keejob', hasLargeImages: false, hasPrice: false},
    '13': {name: 'Automobile.tn', hasLargeImages: true, hasPrice: true},
    '14': {name: 'Tunisie Travail', hasLargeImages: false, hasPrice: false},
    '15': {name: 'Mubawab', hasLargeImages: true, hasPrice: true},
    '16': {name: 'Affare', hasLargeImages: true, hasPrice: true},
    '17': {name: 'Fammech', hasLargeImages: true, hasPrice: true},
    '18': {name: 'emploi.nat.tn', hasLargeImages: false, hasPrice: false},
    '19': {name: 'Locanto', hasLargeImages: true, hasPrice: true},
    '20': {name: 'Sindibad', hasLargeImages: true, hasPrice: true},
    '21': {name: 'Houni.tn', hasLargeImages: true, hasPrice: true},
    '22': {name: 'Cava.tn', hasLargeImages: true, hasPrice: true},
    '23': {name: 'BnB Tunisie', hasLargeImages: true, hasPrice: true}
}

// const files = [
//     {
//         title: 'IM.HEIC',
//         price: '$400',
//         thumbnail:
//             'https://design5.com.au/wp-content/uploads/2018/11/ifb130217_4602.jpg',
//         information: {
//             Category: Object.values(categoryDisplayNames)[2],
//             Location: 'sousse',
//             distance: '10km',
//             CreatedAt: `${month}/${date}/${year}`,
//         },
//         current: false
//
//
//     }, {
//         title: 'I56566.HEIC',
//         price: '777500',
//         thumbnail:
//             'https://www.dvdoverseas.com/resize/Shared/Images/Product/Panasonic-KX-TG1911-220-240-Volt-Cordless-Phone-For-Export-International-Use/kxtg1911.jpg?bw=500&bh=500',
//         information: {
//             Category: Object.values(categoryDisplayNames)[2],
//             Location: 'mahdia',
//             distance: '8km',
//             CreatedAt: `${month}/${date}/${year}`,
//         },
//         current: false
//
//
//     }, {
//         title: 'IMEIC',
//         price: '$5000000',
//         thumbnail:
//             'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
//         information: {
//             Category: Object.values(categoryDisplayNames)[2],
//             Location: 'Location',
//             distance: '7km',
//             CreatedAt: `${month}/${date}/${year}`,
//         },
//         current: false
//
//
//     }
//
//
//     // More files...
// ]


let files = [];
// Usage with a plain action store, it will log actions as "setState"
export const useStore = create(devtools(set => ({
    categoryDisplayNames: categoryDisplayNames,
    files: files,
    currentFile: null,
    list:false,
    setList:(bool)=>set ({list: bool,currentFile:null}),
    setCurrentFile: (index) => set(state => ({currentFile: state.files[index]}), null, "setCurrentFile"),
    setFiles: (data) => set({files: data}, null, "setFiles"),
    loadFiles: async () => {
        const response = await axios({
            url: "http://localhost:3001/api/data",
            method: "GET"
        })
        set({files: await response.data})
    }
})))

export default function Home() {
    const loadFiles = useStore(store => store.loadFiles)
    useEffect(async () => {
        await loadFiles()
    }, []);
    return (
        <>
            <div className="h-full flex">
                {/* Narrow sidebar */}
                {/*<NarrowSidebar/>*/}


                {/* Content area */}
                <ContentArea userNavigation={userNavigation}
                             files={files} tabs={tabs} source={source}/>

            </div>

        </>
    )
}
