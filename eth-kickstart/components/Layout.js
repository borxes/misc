import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
      {/* JSX comment out !!
        <h1>I'm a footer</h1>
      */}
    </Container>
  );
};
