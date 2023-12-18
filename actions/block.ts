'use server'

import { blockUser, unblockUser } from "@/lib/blockedService"
import { revalidatePath } from "next/cache"

export const onBlock = async (id: string) => {
    // TODO: ADAPT TO DISCONNECT FROM LIVESTREAM
    // TODO: ALLOW THE ABILITY TO KICK A VIEWER/GUEST
    const blockedUser = await blockUser(id)
    revalidatePath('/')
    if (blockedUser) revalidatePath(`/${blockedUser.blocked.username}`)
    return blockedUser
}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id)
    revalidatePath('/')
    if (unblockedUser) revalidatePath(`/${unblockedUser.blocked.username}`)
    return unblockedUser
}