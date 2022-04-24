import axios from 'axios';

const USER_URL = "https://therealpantrypal.herokuapp.com/myfood";
const EDIT = "https://therealpantrypal.herokuapp.com/food";

class FoodService {
    
    getFood(){
        return axios.get(USER_URL);
    }

    getFoodById(id) {
        console.log("Getting food info from: " + id)
        return axios.get(USER_URL + "/" + id)
    }

    createFood(food) {
        console.log(food);
        return axios.post(USER_URL, food);
    }

    updateFood(id, data) {
        console.log("Updating food at index " + id + " with data: " + data);
        return axios.put(USER_URL + "/" + id, data);
    }

    deleteFood(id) {
        return axios.delete(USER_URL + "/" + id);
    }

}

export default new FoodService();