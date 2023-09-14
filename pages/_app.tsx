import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import apollo from 'services/apollo-client';
import Auth from 'components/Auth';
import io from 'socket.io-client';

import Layout from 'components/Layout';
import { MantineProvider } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { ChatContext } from 'contexts';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const socketClient = useRef(null);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('ugctent-token');
    if (!socketClient.current && token) {
      const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
        withCredentials: true,
        auth: {
          token,
        },
      });

      console.log(socket, 'SOCKET')
      socketClient.current = socket;
    }

    if (socketClient.current) {
      socketClient.current.on('connect', () => {
        console.log('once ');
        setIsConnected(true);
      });

      socketClient.current.on('disconnect', () => {
        setIsConnected(false);
      });

      socketClient.current.on('pong', () => {
        setLastPong(new Date().toISOString());
      });

      return () => {
        socketClient.current.off('connect');
        socketClient.current.off('disconnect');
        socketClient.current.off('pong');
      };
    }
  }, []);

  const sendPing = () => {
    socketClient.current.emit('ping');
  };

  return (
    <>
    <Head>
      <title>UGCTENT</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="UGCTENT" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
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
          <ChatContext.Provider
            value={{
              socketClient: socketClient.current,
              isConnected,
              lastPong,
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChatContext.Provider>
        </Auth>
      </MantineProvider>
    </ApolloProvider>
    </>
  );
}

export default MyApp;
