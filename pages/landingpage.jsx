import Head from 'next/head'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

import Layout from '../components/layout/layout'

const LandingPage = (data) => {

    const { page, themeName } = useContext(ThemeContext);
    page.setPageTitle('Epic Space Landing Page');

  return (
    <Layout
      nav='none'
      pageStyle='landingPage'
      logo={false} 
      theme={themeName}
    >
      <Head>
        <title>{page.pageTitle}{page.siteTitle}</title>
      </Head>
    </Layout>
  )
}

export default LandingPage;