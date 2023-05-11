import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@fontsource/inter";
import { Notifications } from "@mantine/notifications";
import Script from "next/script";
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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-NDYT0JNEJ4"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NDYT0JNEJ4', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
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
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

// google-analytics
// <!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-NDYT0JNEJ4"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-NDYT0JNEJ4');
// </script>
