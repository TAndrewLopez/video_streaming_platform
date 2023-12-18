import { getSelf } from "@/lib/authService";
import { getStreamByUserId } from "@/lib/streamService";
import { ConnectModal } from "./_components/connectModal";
import { KeyCard } from "./_components/keyCard";
import { URLCard } from "./_components/urlCard";

type Props = {};

const Page = async ({}: Props) => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error("Stream not found");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream.serverURL} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default Page;
