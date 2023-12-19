'use client'

import { useTransition } from "react"
import { toast } from "sonner"

import { onUnblock } from "@/actions/block"
import { Button } from "@/components/ui/button"

type Props = {
    userID: string
}

export const UnblockButton = ({ userID }: Props) => {
    const [isPending, startTransition] = useTransition()

    const onClick = () => {
        startTransition(() => {
            onUnblock(userID)
                .then((r) => toast.success(`User ${r.blocked.username} unblocked`))
                .catch(() => toast.error('Something went wrong'))
        })
    }


    return (
        <Button
            disabled={isPending}
            onClick={onClick}
            variant='link'
            size='sm'
            className="text-blue-500 w-full"
        >
            Unblock
        </Button>
    )
}
