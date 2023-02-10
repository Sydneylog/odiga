import Banner from '../components/Banner/Banner'
import './Home.css'
import styled from 'styled-components'
import PlanList from '../components/Planlist'
import Recommendations from '../components/Recommendations'



function Home(location) {
  return (
    <Container>
      <Banner/>
      <PlanList />
      <RecoLists>
        <Recommendations title='추천 관광지' typeId='12' />
        <Recommendations title='문화시설' typeId='14' />
        <Recommendations title='행사 / 공연 / 축제' typeId='15' />
        {/* <Recommendations title='레포츠' typeId='28' reqURL={requests.fetchReports}/> */}
        <Recommendations title='쇼핑' typeId='38' />
        <Recommendations title='여행코스' typeId='25' />
        <Recommendations title='레포츠' typeId='28' />
        <Recommendations title='숙박' typeId='32' />
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