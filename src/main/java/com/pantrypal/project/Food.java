package com.pantrypal.project;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name="food_table")
public class Food {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private Integer calories;

    @Temporal(TemporalType.DATE)
    Date buyDate;

    @Temporal(TemporalType.DATE)
    Date expirationDate;

    private String category;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    public Food() {

    }

    public Food(String name, User user) {
        this.name = name;
        this.calories = 200;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id=id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name=name;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories=calories;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User u) {
        this.user=u;
    }

    public Date getBuyDate() {
        return this.buyDate;
    }

    public void setBuyDate(Date buyDate) {
        this.buyDate = buyDate;
    }

    public Date getExpirationDate() {
        return this.expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
