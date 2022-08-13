import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import apollo from 'services/apollo-client';
import Auth from 'components/Auth';
import Layout from 'components/Layout';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </ApolloProvider>
  );
}

export default MyApp;
