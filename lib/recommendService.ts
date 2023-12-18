import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommend = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return users
}