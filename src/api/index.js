import axios from 'axios';

const baseURL = 'https://api.spacexdata.com/v4';

function getCompany() {
  return axios.get(`${baseURL}/company`);
}

function getCrew(page) {
  return axios.post(`${baseURL}/crew/query`, {
    options: {
      limit: 5,
      page,
    },
  });
}

function getRockets(page) {
  return axios.post(`${baseURL}/rockets/query`, {
    options: {
      limit: 5,
      page,
    },
  });
}

export { getCompany, getCrew, getRockets };
