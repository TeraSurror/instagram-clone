import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Layout from "../components/Layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();

  const [registerMutation] = useRegisterMutation();

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await registerMutation({
            variables: values,
            update(cache, { data }) {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: {
                    id: data?.register.id,
                    email: data?.register.email,
                    username: data?.register.username,
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
                <div>Email</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" />
              </div>

              <div style={{ marginTop: "1em", width: "400px" }}>
                <div>Username</div>
                <Field
                  style={{ width: "100%", marginTop: "4px", height: "2em" }}
                  type="text"
                  name="username"
                />
                <ErrorMessage name="username" component="div" />
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

export default Register;
