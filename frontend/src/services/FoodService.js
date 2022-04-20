import axios from 'axios';

const USER_URL = "http://localhost:8080/myfood";

class FoodService {
    
    getFood(){
        console.log(axios.get(USER_URL));
        return axios.get(USER_URL);
    }

    createFood(food) {
        console.log(food);
        axios.post(USER_URL, food);
    }

}

export default new FoodService();