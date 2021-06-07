import React from "react";
import NextLink from "next/link";

interface NavbarProps {}

interface NavLinkProps {
    route: string,
    content: string,
}

const NavItem: React.FC<NavLinkProps> = ({route, content}) => {
    return (
        <NextLink href={route}>
            <div style = {{
                cursor: "pointer",
                marginRight: 16,
            }}>
                {content}
            </div>
        </NextLink>
    );

}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em 10em",
        boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
    >
      <div>
          <NavItem content="Instagram" route="/"/>
      </div>

      <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
      }}>
        <NavItem content="Home" route="/"/>
        <NavItem content="Profile" route="/profile"/>
        <NavItem content="Logout" route="/logout"/>
      </div>
    </div>
  );
};

export default Navbar;
