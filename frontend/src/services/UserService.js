import axios from 'axios';

const USER_URL = "http://localhost:8080/myuser";

class UserService {
    
    getUser(){
        console.log(axios.get(USER_URL));
        return axios.get(USER_URL);
    }

}

export default new UserService();