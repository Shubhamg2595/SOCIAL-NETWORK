//Register User
import axios from "axios";
import { GET_ERRORS } from "./types";
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(result => history.push("login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// axios
//   .post("/api/users/register", newUser)
//   .then(result => console.log(result.data))
//   .catch(err => this.setState({ errors: err.response.data }));
