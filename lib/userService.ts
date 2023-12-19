import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    const user = db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            externalUserID: true,
            username: true,
            bio: true,
            imageURL: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailURL: true,
                    name: true,
                }
            },
            _count: {
                select: {
                    followedBy: true
                }
            }
        }
    })
    return user
}

export const getUserById = async (id: string) => {
    const user = db.user.findUnique({
        where: {
            id
        },
        include: {
            stream: true
        }
    })
    return user
}