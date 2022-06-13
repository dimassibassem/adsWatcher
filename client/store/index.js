import axios from "axios";
import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import {parseJwt} from "../utils/token";

const tabs = [
    {name: 'Recently Viewed', href: '/Article', current: true},
    {name: 'Favorited', href: '/favorite', current: false},
]
const userNavigation = [
    {name: 'Home', href: '/Search'},
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
    moreImages: [],
    source: [],
    locations: [],
    tabs: tabs,
    categoryDisplayNames: [],
    currentFile: null,
    pages: 1,
    userNavigation: userNavigation,
    setPages: (num) => {
        set({pages: num}, null, "setPages")
    },
    setArticleToDisplay: (articles) => {
        set({articleToDisplay: articles}, null, "setArticleToDisplay")
    },
    articleToDisplay: [],
    favoriteArticles: [],
    updateArticleToDisplayWithFav: (articlesId) => {
        const articles = get().articleToDisplay
        const newArticles = articles.map(article => {
            if (articlesId === article.id) {
                article.favorite = !article.favorite
            }
            return article
        })
        set({articleToDisplay: newArticles}, null, "updateArticleToDisplayWithFav")
    },
    setCurrentFileToFav: () => {
        set(
            {
                currentFile: {
                    ...get().currentFile,
                    favorite: true
                }
            },
            null,
            "setCurrentFileToFav"
        )
    },
    setCurrentFileToUnFav: () => {
        set(
            {
                currentFile: {
                    ...get().currentFile,
                    favorite: false
                }
            },
            null,
            "setCurrentFileToUnFav"
        )
    },
    setFavArticles: (articles) => {
        set({favoriteArticles: articles}, null, "setFavArticles")
    },
    setOneFavArticle: (article) => {
        //todo: make request to the server to set article to favorite
        set({favoriteArticles: [...get().favoriteArticles, article]}, null, "setOneFavArticle")
    },
    setOneUnFavArticle: (article) => {
        //todo: make request to the server to remove article to favorite
        set({favoriteArticles: get().favoriteArticles.filter(fav => fav.articleId !== article.articleId)}, null, "setOneUnFavArticle")
    },
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
        set({moreImages: await getMoreImages(file, token)}, null, "setMoreImages")
    },
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
});

const createRootStorage = (set, get) => ({
    ...createTokenSlice(set, get)
})

export const useLocalStorage = create(devtools(persist(createRootStorage, {name: "localStorage"})))

const createRootSlice = (set, get) => ({
    ...createStateSlice(set, get),
});

export const useStore = create(devtools(createRootSlice))
