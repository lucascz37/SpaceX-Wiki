import axios from 'axios';

const baseURL = 'https://api.spacexdata.com/v4';

function getCrew(page) {
  return axios.post(`${baseURL}/crew/query`, {
    options: {
      limit: 5,
      page,
    },
  });
}

function getCompany() {
  return axios.get(`${baseURL}/company`);
}

export { getCrew, getCompany };
