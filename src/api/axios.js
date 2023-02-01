import axios from 'axios';

const apiKey ='RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA=='

const instance = axios.create({
  baseURL: 'https://apis.data.go.kr/B551011/KorService/',
  params:{
    _type: 'json',
    serviceKey: apiKey
  }
})
//숙박, 여행코스 제외
//관광지 12 / 문화시설 14 / 행사공연축제 15 / 여행코스 25 / 레포츠 28 / 쇼핑 38 / 숙박 32 /
const typeArray = ['12', '14', '15', '28', '38'];
const randomType = typeArray[Math.floor(Math.random() * typeArray.length)];

//get locationbased data
let params = {
  contentTypeId: randomType,
  numOfRows: '20',
  pageNo: '1',
  MobileOS: 'ETC',
  MobileApp: 'AppTest',
  arrange:'A',
  mapX:'126.983745',
  mapY:'37.583745',
  radius: '1000',
  listYN: 'Y'
}


export {instance, params};

