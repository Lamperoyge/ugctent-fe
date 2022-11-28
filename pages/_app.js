import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import apollo from 'services/apollo-client';
import Auth from 'components/Auth';
import Layout from 'components/Layout';
import { MantineProvider } from '@mantine/core';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    return () => console.log('dcd')
  }, [])
  return (
    <ApolloProvider client={apollo}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </MantineProvider>
    </ApolloProvider>
  );
}

export default MyApp;
