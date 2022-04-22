package com.pantrypal.project;

import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FoodDetailsService {


    @Autowired
    private FoodRepository foodRepository;

    public Set<Food> getFood(Integer id) {
        return foodRepository.getByUserId(id);
    }

    public Set<Food> getCategory(Integer id, String c) {
        return foodRepository.getByCategory(id, c);
    }

    public Food getFoodById(Integer id) {
        return foodRepository.getById(id);
    }

    public Food addFood(String name, Date buyDate, Date expDate, String category, User user) {
        Food food = new Food();
        food.setName(name);
        food.setUser(user);
        food.setBuyDate(buyDate);
        food.setExpirationDate(expDate);
        food.setCategory(category);
        food.setCalories(200);
        return foodRepository.save(food);
    }

    public void deleteFood(Integer id) {
        foodRepository.deleteById(id);
    }
}
