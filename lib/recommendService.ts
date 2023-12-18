import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommend = async () => {
    let userId;

    try {
        const user = await getSelf()
        userId = user.id
    } catch (error) {
        userId = null
    }

    let users = []

    if (userId) {
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
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