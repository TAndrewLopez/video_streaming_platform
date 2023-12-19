import { db } from "./db";
import { getSelf } from "./authService";

export const getSearch = async (term?: string) => {
    let userID;
    try {
        const self = await getSelf()
        userID = self.id
    } catch (error) {
        userID = null
    }

    let streams = []
    if (userID) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blockedBy: {
                            some: {
                                blockedID: userID
                            }
                        }
                    }
                },
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                { updatedAt: 'desc' }
            ]
        })
    } else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            include: {
                user: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                { updatedAt: 'desc' }
            ]
        })
    }
    return streams;

}