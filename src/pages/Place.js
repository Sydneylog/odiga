import React, { useEffect } from 'react'
import styled from 'styled-components'
import KakaoMap from '../components/mapComponents/kakaoMap';
import './Place.css'



function Place() {
  return (
    <Container>
      <KakaoMap className='place_cont'/>
    </Container>
  )
}

export default Place

const Container = styled.div`
  padding-top: 60px;
  position:relative;
  
`