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
          components: {
            Input: {
              styles: (theme) => ({
                input: {
                  "&:focus-within": {
                    borderColor: theme.colors.violet[7],
                  },
                },
              }),
            },
          },
        }}
        // theme={{
        //   components: {
        //     InputWrapper: {
        //       styles: (theme) => ({
        //         label: {
        //           backgroundColor:
        //             theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, .1)',
        //         },
        //       }),
        //     },

        //     Input: {
        //       styles: (theme) => ({
        //         input: { borderColor: theme.colors.violet[theme.fn.primaryShade()] },
        //       }),
        //     },
        //   },
        // }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
