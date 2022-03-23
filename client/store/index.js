import axios from "axios";
import create from "zustand";
import {devtools, persist} from "zustand/middleware";

const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]
const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

const getSource = async (token) => {
    let response = await axios.get('http://localhost:3001/api/getSource', {headers: {'Authorization': 'Bearer ' + token}});
    return response.data;
}


const getCategoryDisplayNames = async (token) => {
    let response = await axios.get('http://localhost:3001/api/getCategoryDisplayNames/', {headers: {'Authorization': 'Bearer ' + token}});
    return response.data;
}
const getMoreImages = async (currentFile, token) => {
    try {
        const res = await axios.get('http://localhost:3001/api/getMoreImages/' + currentFile.id,
            {headers: {'Authorization': 'Bearer ' + token}})
        return res.data
    } catch (e) {
        console.log(e)
    }
}

const createStateSlice = (set, get) => ({
    files: [],
    list: false,
    moreImages: [],
    source: [],
    tabs: tabs,
    categoryDisplayNames: [],
    currentFile: null,
    userNavigation: userNavigation,
    setSource: async (token) => {
        let response = await getSource(token);
        set({source: response});
    },
    setMoreImages: async (file, token) => {
        set({moreImages: await getMoreImages(file, token)}, null, "moreImages")
    },
    setList: (bool) => set({list: bool, currentFile: null}),
    setCurrentFile: (index) => set(state => ({
        currentFile: state.files[index]
    }), null, "setCurrentFile"),
    setFiles: (data) => set({files: data}, null, "setFiles"),
    setCategoryDisplayNames: async (token) => {
        set({categoryDisplayNames: await getCategoryDisplayNames(token)}, null, "setCategoryDisplayNames")
    }
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
