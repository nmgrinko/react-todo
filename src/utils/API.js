import axios from "axios";

// for Localhost:
const povider = 'https://cors-anywhere.herokuapp.com/';

const urlTest = 'https://react-todo-21012021-default-rtdb.europe-west1.firebasedatabase.app/todo-list.json';

export default axios.create({
    baseURL : povider + urlTest,
    responseType : "json"
});