import axios from 'axios';


const apiKey ='RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA=='

const instance = axios.create({


  baseURL: 'https://apis.data.go.kr/B551011/KorService/',
  params:{
    _type: 'json',
    serviceKey: apiKey,
  }
})


export {instance};

