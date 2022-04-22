import axios from 'axios';

const USER_URL = "https://therealpantrypal.herokuapp.com/myfood";
const EDIT = "https://therealpantrypal.herokuapp.com";

class FoodService {
    
    getFood(){
        return axios.get(USER_URL);
    }

    getFoodById(id) {
        console.log("Getting food info from: " + id)
        return axios.get(EDIT + "/" + id)
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