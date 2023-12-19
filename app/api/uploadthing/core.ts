import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getSelf } from "@/lib/authService";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1
        }
    }).middleware(async () => {
        const self = await getSelf()
        return { user: self }
    }).onUploadComplete(async ({ metadata, file }) => {
        await db.stream.update({
            where: {
                userID: metadata.user.id,
            },
            data: {
                thumbnailURL: file.url
            }
        })
        return { fileURL: file.url }
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;