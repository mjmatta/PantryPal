import axios from 'axios';

const USER_URL = "http://therealpantrypal.herokuapp.com/myfood/myuser";

class UserService {
    
    getUser(){
        console.log(axios.get(USER_URL));
        return axios.get(USER_URL);
    }

}

export default new UserService();