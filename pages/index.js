import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from 'hooks';

export default function Home() {
  const auth = useAuth();
  return <div>hi</div>;
}
