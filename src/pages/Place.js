import React, { useEffect } from 'react'
import styled from 'styled-components'
import KakaoMap from '../components/mapComponents/kakaoMap';
import PlanBox from '../components/mapComponents/PlanBox';
import MapMenu from '../components/mapComponents/MapMenu';
import './Place.css'



function Place() {
  return (
    <Container>
      <MapMenu />
      <KakaoMap />
      <PlanBox />
    </Container>
  )
}

export default Place

const Container = styled.div`
  padding-top: 60px;
  position:relative;
  
`