const prisma = require("../utils/prismaClient");

const getArticlesNoMinMaxPrice = async (search, page) => {
    const articles = await prisma.article.findMany({
        include: {
            favorite: true,
        },
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        include: {
            favorite: true,
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
};

const getArticlesNoMinPrice = async (search, page) => {
    let articles = await prisma.article.findMany({
        include: {
            favorite: true,
        },
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
            ]
        }
    })
    let articlesCount = Object.keys(await prisma.article.findMany({
        include: {
            favorite: true,
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
            ]
        }
    })).length

    return {articles, articlesCount}
}

const getArticlesNoMaxPrice = async (search, page) => {
    const articles = await prisma.article.findMany({
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
}

const getArticlesAllFilterPrice = async (search, page) => {
    const articles = await prisma.article.findMany({
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
}

const getFavArticlesNoMinMaxPrice = async (search, page ,user) => {
    const articles = await prisma.article.findMany({
        include: {
            favorite: true,
        },
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        include: {
            favorite: true,
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
};

const getFavArticlesNoMinPrice = async (search, page ,user) => {
    let articles = await prisma.article.findMany({
        include: {
            favorite: true,
        },
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
            ]
        }
    })
    let articlesCount = Object.keys(await prisma.article.findMany({
        include: {
            favorite: true,
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                },
            ]
        }
    })).length

    return {articles, articlesCount}
}

const getFavArticlesNoMaxPrice = async (search, page ,user) => {
    const articles = await prisma.article.findMany({
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),

                    },
                    location: {
                        contains: "Not specified"
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
}

const getFavArticlesAllFilterPrice = async (search, page ,user) => {
    const articles = await prisma.article.findMany({
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        },
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })
    const articlesCount = Object.keys(await prisma.article.findMany({
        where: {
            favorite: {
                some: {
                    id: user.userId
                }
            },
            OR: [
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    title: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: search.region
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        gte: parseFloat(search.minPrice),
                        lte: parseFloat(search.maxPrice),
                    },
                    location: {
                        contains: "Not specified"
                    }
                }, {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: search.region
                    }
                },
                {
                    description: {
                        contains: search.query
                    },
                    price: {
                        equals: 0,
                    },
                    location: {
                        contains: "Not specified"
                    }
                }
            ]
        }
    })).length

    return {articles, articlesCount}
}

module.exports = {
    getArticlesNoMinMaxPrice,
    getArticlesNoMinPrice,
    getArticlesNoMaxPrice,
    getArticlesAllFilterPrice,
    getFavArticlesNoMinMaxPrice,
    getFavArticlesNoMinPrice,
    getFavArticlesNoMaxPrice,
    getFavArticlesAllFilterPrice
}
