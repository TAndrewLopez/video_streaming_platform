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
                    // CHECK WE ARE NOT THE USER
                    {
                        NOT: {
                            id: userID
                        }
                    },
                    // CHECK WE AREN'T FOLLOWING THE USER
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerID: userID
                                }
                            }
                        }
                    },
                    // CHECK WE AREN'T BLOCKING THE USER
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
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

    } else {
        users = await db.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return users
}