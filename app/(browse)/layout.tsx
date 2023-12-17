import { Navbar } from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const BrowseLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>;
    </>
  );
};

export default BrowseLayout;
