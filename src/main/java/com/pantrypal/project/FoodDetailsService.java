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
}
