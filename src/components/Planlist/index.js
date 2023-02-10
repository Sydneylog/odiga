import React from 'react'
import styled from 'styled-components'
import './planLIst.css'


function Index() {
  // const plansRef = collection(db, 'myplan')
  // const [plans, setPlanList] = useState([])
  // const [changed, setChanged] = useState(false)

  // useEffect(() => {
  //   const getLists = async () => {
  //     const data = await getDocs(
  //       query(plansRef, orderBy('timeStamp','desc'))
  //     )
  //     console.log('파베 데이터', data)
  //     setPlanList(
  //       data.docs.map( 
  //         (doc)=> (
  //           {...doc.data(), id:doc.id}
  //         ))
  //     )
  //   }
  //   getLists();
  //   setChanged(false)
  // }, [changed])



  return (
    <Container>
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <PlanBox>
            <h3 className='plan_title'>자주 가는 곳</h3>
            <p className='plan_date'>2023-02-01</p>
            <p className='plan_rep'>대표 장소 이름</p>
            <button className='plan_btn'> 자세히 보기</button>
        </PlanBox>
        <PlanBox>
          <h3 className='plan_title'>동네 모임 코스</h3>
          <p className='plan_date'>2023-01-25</p>
          <p className='plan_rep'>대표 장소 이름</p>
          <button className='plan_btn'> 자세히 보기</button>
        </PlanBox>
        <PlanBox>
        <h3 className='plan_title'>주변 맛집</h3>
          <p className='plan_date'>2023-01-10</p>
          <p className='plan_rep'>대표 장소 이름</p>
          <button className='plan_btn'> 자세히 보기</button>
        </PlanBox>
      </div>
    </Container>
  )
}

export default Index

const Container = styled.div`
  margin:auto;
  margin-top:30px;
  width:100vw;
  height: 220px;
  background-color: #E5E0FF;
  padding: 20px;
  box-sizing: border-box;
  display:grid;
  font-family:Dongle;

`
const PlanBox = styled.div`
  border-radius: 10px;
  width:30%;
  height:95%;
  background-color: #FFF2F2;
  text-align:center;
  position:relative;
  border: 3px solid #f7d8d8;

`