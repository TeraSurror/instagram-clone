import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { useMeQuery, usePostsQuery } from "../generated/graphql";

export default function Home() {
  const { data, loading, error } = usePostsQuery();
  const { data: meData } = useMeQuery();

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
      >
        Could not load page cuz {error.message}
      </div>
    );
  }

  return (
    <Layout>
      <div
        style={{
          marginTop: 16,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data?.posts.map((post) => {
          return !post ? null : (
            <PostCard
              key={post?.id}
              username={post.creator.username}
              caption={post.caption}
              imageSrc={post.image}
              likes={post.likes}
              me={meData?.me?.username === post.creator.username}
            />
          );
        })}
      </div>
    </Layout>
  );
}
