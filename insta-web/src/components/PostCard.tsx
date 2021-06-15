import { useRouter } from "next/dist/client/router";
import React from "react";
import { FaRegHeart, FaEdit } from "react-icons/fa";

interface PostCardProps {
  username: string | null | undefined;
  imageSrc: string | null | undefined;
  likes: number | null | undefined;
  caption: string | null | undefined;
  me: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  username,
  imageSrc,
  likes,
  caption,
  me,
}) => {

  const router = useRouter();

  return (
    <div
      style={{
        margin: "1em 0",
        display: "flex",
        flexDirection: "column",
        width: "80%",
        boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      }}
    >
      <div
        style={{
          padding: "1em",
          boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          fontWeight: "bold",
        }}
      >
        <div>{username}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        }}
      >
        <img src={imageSrc} width="100%" height="auto" />
      </div>

      <div
        style={{
          paddingTop: "1em",
          paddingLeft: "1em",
        }}
      >
        <FaRegHeart size="24px" />
        {/* <FaHeart size="24px" color="red"/> */}
      </div>

      <div
        style={{
          paddingTop: 0,
          paddingLeft: "1em",
          paddingBottom: "1em",
          paddingRight: "1em",
        }}
      >
        <p style={{ marginTop: "4px" }}>{`${likes} Likes`}</p>
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
