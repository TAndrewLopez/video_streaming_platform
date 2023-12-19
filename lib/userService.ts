import { db } from "./db"

export const getUserByUsername = async (username: string) => {
    const user = db.user.findUnique({
        where: {
            username
        },
        include: {
            stream: true,
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