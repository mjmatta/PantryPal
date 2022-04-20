package com.pantrypal.project;

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

    public Food addFood(String name, User user) {
        Food food = new Food();
        food.setName(name);
        food.setUser(user);
        food.setCal(200);
        return foodRepository.save(food);
    }
}
