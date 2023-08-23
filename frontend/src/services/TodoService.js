import axios from 'axios';

const API_URL = 'http://localhost:8081/todos';

class TodoService {

    getTodos() {
        return axios.get(API_URL);
    }

    createTodos(todo){
        return axios.post(API_URL,todo);
    }

    getTodoById(id){
        return axios.get(API_URL + '/' + id);
    }

}
export default new TodoService();