import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";

interface NavbarProps {}

interface NavLinkProps {
  route: string;
  content: string;
}

const NavItem: React.FC<NavLinkProps> = ({ route, content }) => {
  return (
    <NextLink href={route}>
      <div
        style={{
          cursor: "pointer",
          marginRight: 16,
        }}
      >
        {content}
      </div>
    </NextLink>
  );
};

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const { data, loading, error } = useMeQuery();

  let body;

  if (loading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NavItem content="Home" route="/" />
        <NavItem content="Register" route="/register" />
        <NavItem content="Login" route="/login" />
      </>
    );
  } else {
    body = (
      <>
        <div>
          <button
            style={{ height: "2.5em", padding: "0 1em", marginRight: 16 }}
            onClick={() => {
              router.push("/create-post");
            }}
          >
            Create Post
          </button>
        </div>
        <NavItem content="Home" route="/" />
        <div
          style={{
            cursor: "pointer",
            marginRight: 16,
          }}
        >
          {data?.me?.username}
        </div>
        <div
          onClick={async () => {
            await logout();
            router.reload();
          }}
          style={{
            cursor: "pointer",
            marginRight: 16,
          }}
        >
          Logout
        </div>
      </>
    );
  }

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
        <img
          alt="icon"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {body}
      </div>
    </div>
  );
};

export default Navbar;
