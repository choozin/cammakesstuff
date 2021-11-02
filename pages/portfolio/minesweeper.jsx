import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

import Layout from '../../components/layout/layout'

import MineSweeperWindow from '../../components/minesweeper/MineSweeperWindow'

const MineSweeper = (data) => {

    const { page, themeName } = useContext(ThemeContext);
    page.setPageTitle('Virus_Sweeper');

  return (
    <Layout
      nav='navbar'
      pageStyle='thin'
      logo={false} 
      theme={themeName}
    >
      <Head>
        <title>{page.pageTitle}{page.siteTitle}</title>
      </Head>
      <MineSweeperWindow />
    </Layout>
  )
}

export default MineSweeper;