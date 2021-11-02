import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

import Layout from '../components/layout/layout'

const Home = (data) => {

    const { page, themeName } = useContext(ThemeContext);
    page.setPageTitle('Index');

  return (
    <Layout
      nav='navbar'
      pageStyle='thin'
      logo={true} 
      theme={themeName}
    >
      <Head>
        <title>{page.pageTitle}{page.siteTitle}</title>
      </Head>
      <section style={{ height: '200vh' }}>
        <h1>Hello World</h1>
      </section>
    </Layout>
  )
}

export default Home;