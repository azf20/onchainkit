import type { ReactNode } from 'react';
import Layout from './layout';
import App from './app';

export function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
}

export default function MiniKit() {
  return <App />;
}
