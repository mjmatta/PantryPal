package com.pantrypal.project;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FoodRepository extends  JpaRepository<Food, Integer>{

	public Set<Food> getByUserId(Integer id);

	public void deleteById(Integer id);

	@Query(value="SELECT * FROM food_table WHERE user_id = ?1 AND category = ?2", nativeQuery = true)
	public Set<Food> getByCategory(Integer id, String category);
}
