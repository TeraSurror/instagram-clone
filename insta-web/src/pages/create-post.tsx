import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Layout from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const router = useRouter();

  const [createPost] = useCreatePostMutation();

  return (
    <Layout>
      <Formik
        initialValues={{
          image: "",
          caption: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await createPost({ variables: values });
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: "1em", width: "400px" }}>
                <div>Image URL</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="text"
                  name="image"
                />
                <ErrorMessage name="image" component="div" />
              </div>

              <div style={{ marginTop: "1em", width: "400px" }}>
                <div>Post Caption</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="text"
                  name="caption"
                />
                <ErrorMessage name="caption" component="div" />
              </div>

              <div style={{ marginTop: "1em" }}>
                <button
                  style={{ height: "2.5em", padding: "0 1em" }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
