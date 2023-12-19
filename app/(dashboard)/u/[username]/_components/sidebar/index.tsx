import { Navigation } from "./navigation";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

type Props = {};

export const Sidebar = ({ }: Props) => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};
