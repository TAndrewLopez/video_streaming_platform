import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommend = async () => {
    let userID;

    try {
        const user = await getSelf()
        userID = user.id
    } catch (error) {
        userID = null
    }

    let users = []

    if (userID) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userID
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerID: userID
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedID: userID
                                }
                            }
                        }
                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return users
}