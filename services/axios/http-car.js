import axios from 'axios';

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_CARS_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
