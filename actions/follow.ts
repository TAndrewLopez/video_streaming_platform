'use server'

import { revalidatePath } from "next/cache"

import { followUser } from "@/lib/followService"

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id)
        revalidatePath("/")

        if (followedUser) {
            revalidatePath(`/${followUser.following.username}`);
        }
        return followedUser
    } catch (error) {
        throw new Error("Internal Error")
    }
}

