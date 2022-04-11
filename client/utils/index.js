import axios from "axios";

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const getFavArticles = async (userData) => {
    const res = await axios.get(`http://localhost:3001/api/favorite/${userData?.id}`)
    if (res.data.message) {
        return {}
    }
    return res.data
}
