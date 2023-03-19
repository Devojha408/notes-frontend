import axios from "axios";
const API_URL = "http://localhost:3001/";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "users/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          console.log("Login successfully", response);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("note");
    window.reload();
  }
  register(firstName, lastName, email, password, number) {
    return axios.post(API_URL + "users/signup", {
      firstName,
      lastName,
      email,
      password,
      number
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();