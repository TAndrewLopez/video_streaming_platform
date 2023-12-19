import { StreamPlayerSkeleton } from "@/components/streamPlayer"

type Props = {}

const Loading = ({ }: Props) => {
    return (
        <div className="h-full">
            <StreamPlayerSkeleton />
        </div>
    )
}

export default Loading