import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3001/users/';
class UserService {
  getUserBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}
export default new UserService();