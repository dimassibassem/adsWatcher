import axios from "axios";
import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {parseJwt} from "../utils/token";

const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]
const userNavigation = [
    {name: 'Home', href: '/'},
    {name: 'Your profile', href: '/Profile'},
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
        const res = await axios.get('http://localhost:3001/api/getMoreImages/' + currentFile.articleId,
            {headers: {'Authorization': 'Bearer ' + token}})
        return res.data
    } catch (e) {
        console.log(e)
    }
}

const userInfo = async (decodedToken, token) => {
    if (decodedToken) {
        const res = await axios.get(`http://localhost:3001/api/users/${decodedToken.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    }
}

async function getLocations() {
    const res = await axios.get(`http://localhost:3001/api/getLocationData`)
    return res.data
}

const createStateSlice = (set, get) => ({
    userData: null,
    queries: [],
    list: true,
    moreImages: [],
    source: [],
    locations: [],
    tabs: tabs,
    categoryDisplayNames: [],
    currentFile: null,
    userNavigation: userNavigation,
    setUserData: async (token) => {
        const decodedToken = parseJwt(token);
        const result = await userInfo(decodedToken, token);
        set({userData: result}, null, "setUserData")
    },
    setLocations: async () => {
        const result = await getLocations()
        set({locations: result}, null, "setLocations")
    },
    setSource: async (token) => {
        let response = await getSource(token);
        set({source: response}, null, "setSource");
    },
    setMoreImages: async (file, token) => {
        set({moreImages: await getMoreImages(file, token)}, null, "moreImages")
    },
    setList: (bool) => set({list: bool, currentFile: null}),
    setCurrentFile: (article) => set({
        currentFile: article
    }, null, "setCurrentFile"),
    setQueries: (data) => set({queries: data}, null, "setQueries"),
    setCategoryDisplayNames: async (token) => {
        set({categoryDisplayNames: await getCategoryDisplayNames(token)}, null, "setCategoryDisplayNames")
    }
})

const createTokenSlice = (set, get) => ({
    token: null,
    setToken: (token) => set({token: token}, null, "setToken"),
    setArticleToDisplay: (articles) => set({articleToDisplay: articles}, null, "articleToDisplay"),
    articleToDisplay: [],
});

const createRootStorage = (set, get) => ({
    ...createTokenSlice(set, get)
})

export const useLocalStorage = create(devtools(persist(createRootStorage, {name: "localStorage"})))

const createRootSlice = (set, get) => ({
    ...createStateSlice(set, get),
});

export const useStore = create(devtools(createRootSlice))
