import axios from "axios";
import create from "zustand";
import {devtools, persist} from "zustand/middleware";

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

const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]
const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

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




const createStateSlice = (set, get) => ({
    files: [],
    list: false,
    setList: (bool) => set({list: bool, currentFile: null}),
    setCurrentFile: (index) => set(state => ({currentFile: state.files[index]}), null, "setCurrentFile"),
    setFiles: (data) => set({files: data}, null, "setFiles"),

    source: source,
    tabs: tabs,
    categoryDisplayNames: categoryDisplayNames,
    currentFile: null,
    userNavigation: userNavigation
})
const createTokenSlice = (set, get) => ({
    token: null,
    setToken: (token) => set({token: token})
});

const createRootStorage = (set, get) => ({
    ...createTokenSlice(set, get)
})

export const useLocalStorage = create(devtools(persist(createRootStorage, {name: "localStorage"})))

const createRootSlice = (set, get) => ({
    ...createStateSlice(set, get),
});

export const useStore = create(devtools(createRootSlice))
