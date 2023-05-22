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

function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false);
  const socketClient = useRef(null);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('ugctent-token');
    if (!socketClient.current && token) {
      const socket = io('http://localhost:4000', {
        withCredentials: true,
        auth: {
          token,
        },
      });

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
    // <GenerateContract
    //   userFullname={'test'}
    //   userAddress={'Adresa mea'}
    //   userCISeries={'RD'}
    //   userCINumber={'944923'}
    //   userCIDate={'04/20/20'}
    //   userCIInstitute={'SPCEP Sector 5'}
    //   userCNP={'1950420803921'}
    //   companyFullName={'Companie'}
    //   companyFullAddress={'Adresa companiei'}
    //   companyNumber={'J40/123/1234'}
    //   companyCUI={'123456'}
    //   companyRepresentative={'Reprezentant'}
    //   jobTitle={'Job'}
    //   paidSum={'1000'}
    // />
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
  );
}

export default MyApp;
