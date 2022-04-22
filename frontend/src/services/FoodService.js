import axios from 'axios';

const USER_URL = "http://therealpantrypal.herokuapp.com/myfood";

class FoodService {
    
    getFood(){
        return axios.get(USER_URL);
    }

    createFood(food) {
        console.log(food);
        axios.post(USER_URL, food);
    }

    deleteFood(id) {
        axios.delete(USER_URL + "/" + id);
    }

}

export default new FoodService();