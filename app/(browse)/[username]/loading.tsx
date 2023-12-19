import { StreamPlayerSkeleton } from "@/components/streamPlayer"

type Props = {}

const LoadingPage = ({ }: Props) => {
    return (
        <div className="h-full">
            <StreamPlayerSkeleton />
        </div>
    )
}

export default LoadingPage