import axios from 'axios';

const USER_URL = "https://therealpantrypal.herokuapp.com/myuser";

class UserService {
    
    getUser(){
        console.log(axios.get(USER_URL));
        return axios.get(USER_URL);
    }

}

export default new UserService();