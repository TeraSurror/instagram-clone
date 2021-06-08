import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Layout from "../components/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Layout>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          const response = await login({
            variables: values,
            update(cache, { data }) {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: {
                    id: data?.login.id,
                    email: data?.login.email,
                    username: data?.login.username,
                  },
                },
              });
            },
          });

          if (response.errors) {
            alert("there was an error");
          } else {
            setSubmitting(false);
            router.replace("/");
          }
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
                <div>Username or Email</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="text"
                  name="usernameOrEmail"
                />
                <ErrorMessage name="usernameOrEmail" component="div" />
              </div>

              <div style={{ marginTop: "1em", width: "400px" }}>
                <div>Password</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" />
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

export default Login;
