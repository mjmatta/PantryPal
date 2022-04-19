package com.pantrypal.project;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends  JpaRepository<Food, Integer>{

	public Set<Food> getByUserId(Integer id);
}
