import Head from 'next/head'
import BasicTable from './components/BasicTable'
import FilteringTable from './components/FilteringTable'
// import LandingPage from './components/LandingPage'
// import DataTable from './DataTable'
import SortingTable from './components/SortingTable'
import MOCK_DATA from './components/MOCK_DATA.json'
import { COLUMNS } from './components/columns'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {

  let [initialData, setInitialData] = useState({});
  useEffect(() => {
    initialData = axios
      .get(`http://localhost:3004/employees?_page=1&_limit=10`)
      .then(res => {
        // console.log(res.data);
        setInitialData(res.data);
      })
      .catch(err => console.log(err))

  }, [])




  // console.log(initialData);

  if (initialData.length > 0) {
    return <FilteringTable searchable pagination data1={initialData} columns1={COLUMNS} />
  }




  // console.log(initialData);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <DataTable></DataTable> */}

      {/* <LandingPage></LandingPage> */}
      {/* <BasicTable></BasicTable> */}
      {/* <SortingTable></SortingTable> */}
      {/* <FilteringTable /> */}
      {/* <FilteringTable searchable pagination data1={MOCK_DATA} columns1={COLUMNS}/> */}
      {/* <FilteringTable searchable pagination data1={initialData} columns1={COLUMNS} /> */}
    </>
  )
}
