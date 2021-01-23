import axios from "axios";

const urlTest = 'https://react-todo-21012021-default-rtdb.europe-west1.firebasedatabase.app/todo-list.json';

export default axios.create({
    baseURL : urlTest,
    responseType : "json"
});