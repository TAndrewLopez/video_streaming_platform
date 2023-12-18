import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/authService";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

const CreatorLayout = async ({ params, children }: Props) => {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
