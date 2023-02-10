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
      <h3>My plans</h3>
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <PlanBox>Planlist1</PlanBox>
        <PlanBox>Planlist2</PlanBox>
        <PlanBox>Planlist3</PlanBox>
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
  background-color: #E5E0FF
`
const PlanBox = styled.div`
  border-radius: 4px;
  width:30%;
  height:180px;
  background-color: #FFF2F2;

`