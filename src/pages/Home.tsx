import React from 'react'
import Banner from '../components/Banner/Banner'
import './Home.css'
import styled from 'styled-components'
import PlanList from '../components/Planlist'
import Recommendations from '../components/Recommendations'
import requests from '../api/requests'



function Home() {
  
  return (
    <Container>
      <Banner />
      <PlanList />
      <RecoLists>
        <Recommendations title='추천 관광지' typeId='12' reqURL={requests.fetchSightseeing}/>
        <Recommendations title='문화시설' typeId='14' reqURL={requests.fetchCulture}/>
        <Recommendations title='행사 / 공연 / 축제' typeId='15' reqURL={requests.fetchFestivals}/>
        {/* <Recommendations title='레포츠' typeId='28' reqURL={requests.fetchReports}/> */}
        <Recommendations title='쇼핑' typeId='38' reqURL={requests.fetchShopping}/>
      </RecoLists>
    </Container>
  )
}

export default Home

const Container = styled.div`
  padding-top: 60px;
`
const RecoLists = styled.div`

`