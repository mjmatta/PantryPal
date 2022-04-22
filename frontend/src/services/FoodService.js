import axios from 'axios';

const USER_URL = "https://therealpantrypal.herokuapp.com/myfood";

class FoodService {
    
    getFood(){
        return axios.get(USER_URL);
    }

    getFoodById(id) {
        return axios.get(USER_URL + "/" + id)
    }

    createFood(food) {
        console.log(food);
        axios.post(USER_URL, food);
    }

    updateFood(id, data) {
        axios.put(USER_URL + "/" + id, data)
    }

    deleteFood(id) {
        axios.delete(USER_URL + "/" + id);
    }

}

export default new FoodService();