import React from "react";
import { Container, Typography } from "@material-ui/core";
import Banner from "../components/Banner";
import withSession from "../lib/session";

function Home({ user }) {
  return <Banner isLoggedIn={user.isLoggedIn} />;
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (!user) {
    return {
      props: { user: false },
    };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default Home;
