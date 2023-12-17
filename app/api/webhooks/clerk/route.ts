import { Webhook } from "svix";
import { headers } from 'next/headers'
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // GET THE HEADERS
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // IF THERE ARE NO HEADERS, ERROR OUT THE FUNCTION
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // GET THE BODY
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // CREATE A NEW SVIX INSTANCE WITH SECRET
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent

    // VERIFY THE PAYLOAD WITH THE HEADERS
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // GET THE ID AND EVENT TYPE
    const { id } = evt.data;
    const eventType = evt.type;

    // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    // console.log('Webhook body:', body)

    if (eventType === 'user.created') {
        await db.user.create({
            data: {
                externalUserID: payload.data.id,
                username: payload.data.username,
                imageURL: payload.data.image_url,
            }
        })
    }

    if (eventType === 'user.updated') {
        await db.user.update({
            where: {
                externalUserID: payload.data.id,
            },
            data: {
                username: payload.data.username,
                imageURL: payload.data.image_url,
            }
        })
    }

    if (eventType === 'user.deleted') {
        await db.user.delete({
            where: {
                externalUserID: payload.data.id
            }
        })
    }

    return new Response('', { status: 200 })

}