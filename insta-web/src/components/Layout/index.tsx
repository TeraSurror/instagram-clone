import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
};

export default Layout;
