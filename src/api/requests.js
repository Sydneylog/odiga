


//숙박, 여행코스 제외
//관광지 12 / 문화시설 14 / 행사공연축제 15 / 여행코스 25 / 레포츠 28 / 쇼핑 38 / 숙박 32 /
const typeArray = ['12', '14', '15', '28', '38'];
const randomType = typeArray[Math.floor(Math.random() * typeArray.length)];


// handleGeoSucces 수정


const requests = {
  //get locationbased data
  //base
  fetchBasePath:{
    contentTypeId: randomType,
    numOfRows: '20',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'A',
    mapX: '126.983745',
    mapY: '37.583745',
    radius: '3000',
    listYN: 'Y'
  },
  // 관광지 12
  fetchSightseeing:{
    contentTypeId: '12',
    numOfRows: '10',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'Q',
    mapX:'126.983745',
    mapY:'37.583745',
    radius: '1000',
    listYN: 'Y'
  },
  // 문화시설 14
  fetchCulture:{
    contentTypeId: '14',
    numOfRows: '10',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'Q',
    mapX:'126.983745',
    mapY:'37.583745',
    radius: '1000',
    listYN: 'Y'
  },
  // 행사공연축제 15
  fetchFestivals:{
    contentTypeId: '15',
    numOfRows: '10',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'Q',
    mapX:'126.983745',
    mapY:'37.583745',
    radius: '1000',
    listYN: 'Y'
  },
  // 레포츠 28
  fetchReports:{
    contentTypeId: '28',
    numOfRows: '10',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'Q',
    mapX:'126.983745',
    mapY:'37.583745',
    radius: '1000',
    listYN: 'Y'
  },
  // 쇼핑 38
  fetchShopping:{
    contentTypeId: '38',
    numOfRows: '10',
    pageNo: '1',
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    arrange:'Q',
    mapX:'126.983745',
    mapY:'37.583745',
    radius: '1000',
    listYN: 'Y'
  }
}



export default requests 
