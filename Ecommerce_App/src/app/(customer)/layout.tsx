import Header from "@/components/header";
import { PropsWithChildren } from "react";

const CustomerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
};
export default CustomerLayout;
