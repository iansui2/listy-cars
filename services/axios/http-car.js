import axios from 'axios';

export default axios.create({
  baseURL: "https://listy-cars-backend.000webhostapp.com/api",
  headers: {
    'Content-type': 'application/json'
  },
});
