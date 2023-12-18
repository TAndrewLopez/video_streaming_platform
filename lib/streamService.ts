import { db } from "./db";

export const getStreamByUserId = async (userID: string) => {
    const stream = db.stream.findUnique({
        where: {
            userID
        }
    })

    return stream
}