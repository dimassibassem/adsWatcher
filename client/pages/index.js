
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
