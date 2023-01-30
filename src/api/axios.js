import axios from 'axios';

const apiKey = 'RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D'
const instance = axios.create({
  baseURL: 'https://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=' + apiKey,
})

export default instance