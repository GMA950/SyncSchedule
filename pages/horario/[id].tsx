import { useRouter } from "next/router";

export default () => {
  const {
    query: { id }
  } = useRouter();

  return <div>{id}</div>;
};
