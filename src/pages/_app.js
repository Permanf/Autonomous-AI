import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@fontsource/inter";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Autonomous AI</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        theme={{
          colorScheme: "dark",
          fontFamily: "Inter",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
