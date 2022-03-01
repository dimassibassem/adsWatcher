import {
    CogIcon,
    CollectionIcon,
    HomeIcon,
    PhotographIcon,
    UserGroupIcon,
    ViewGridIcon as ViewGridIconOutline,

} from '@heroicons/react/outline'
import NarrowSidebar from "../components/NarrowSidebar";
import ContentArea from "../components/ContentArea";


const navigation = [
    {name: 'Home', href: '#', icon: HomeIcon, current: false},
    {name: 'All Files', href: '#', icon: ViewGridIconOutline, current: false},
    {name: 'Photos', href: '#', icon: PhotographIcon, current: true},
    {name: 'Shared', href: '#', icon: UserGroupIcon, current: false},
    {name: 'Albums', href: '#', icon: CollectionIcon, current: false},
    {name: 'Settings', href: '#', icon: CogIcon, current: false},
]
const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]
const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]
const files = [
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: true,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    {
        title: 'IMG_4985.HEIC',
        price: '$500',
        thumbnail:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
        current: false,
    },
    // More files...
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
let source=  {
    '1': { name: 'Tunisie Annonce', hasLargeImages: true, hasPrice: true },
    '2': { name: 'Tayara', hasLargeImages: true, hasPrice: true },
    '3': { name: 'Ballouchi', hasLargeImages: true, hasPrice: true },
    '4': { name: 'Facebook', hasLargeImages: true, hasPrice: true },
    '5': { name: 'Ahaya', hasLargeImages: true, hasPrice: true },
    '6': { name: 'Tanitjobs', hasLargeImages: false, hasPrice: false },
    '7': { name: 'Afariat', hasLargeImages: true, hasPrice: true },
    '8': { name: 'Tunisiapromo', hasLargeImages: true, hasPrice: true },
    '9': { name: 'Jumia Deals', hasLargeImages: true, hasPrice: true },
    '10': { name: 'DannousTn', hasLargeImages: true, hasPrice: true },
    '11': { name: 'Ijaelhouni', hasLargeImages: true, hasPrice: true },
    '12': { name: 'Keejob', hasLargeImages: false, hasPrice: false },
    '13': { name: 'Automobile.tn', hasLargeImages: true, hasPrice: true },
    '14': { name: 'Tunisie Travail', hasLargeImages: false, hasPrice: false },
    '15': { name: 'Mubawab', hasLargeImages: true, hasPrice: true },
    '16': { name: 'Affare', hasLargeImages: true, hasPrice: true },
    '17': { name: 'Fammech', hasLargeImages: true, hasPrice: true },
    '18': { name: 'emploi.nat.tn', hasLargeImages: false, hasPrice: false },
    '19': { name: 'Locanto', hasLargeImages: true, hasPrice: true },
    '20': { name: 'Sindibad', hasLargeImages: true, hasPrice: true },
    '21': { name: 'Houni.tn', hasLargeImages: true, hasPrice: true },
    '22': { name: 'Cava.tn', hasLargeImages: true, hasPrice: true },
    '23': { name: 'BnB Tunisie', hasLargeImages: true, hasPrice: true }
}


const currentFile = {
    title: 'IMG_4985.HEIC',
    price: '$500',
    thumbnail:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    information: {
        Category: Object.values(categoryDisplayNames)[2],
        Location: 'Location',
        distance: '7km',
        CreatedAt: `${month}/${date}/${year}`,
    }

}

export default function Home() {
    return (
        <>
            <div className="h-full flex">
                {/* Narrow sidebar */}
                <NarrowSidebar navs={navigation}/>


                {/* Content area */}
                <ContentArea userNavigation={userNavigation}
                             currentFile={currentFile} files={files} tabs={tabs} source={source}/>

            </div>

        </>
    )
}
