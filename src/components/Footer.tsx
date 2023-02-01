import styled from "styled-components"


function Footer() {
  return (
    <Content>
      <p>모든 관광 정보는 관광공사 API에서 제공 되었습니다.</p>
    </Content>
  )
}

export default Footer

const Content = styled.div`
  font-family:'Dongle';
  color:white;
  width:100 vw;
  height:100%;
  padding: 15px;
  box-sizing:border-box;
  text-align:center;
  margin-top: 50px;
  background-color: #7286D3;
  font-weight:700;
  font-size:1.3rem
  position:absolute;
  bottom:0;
`