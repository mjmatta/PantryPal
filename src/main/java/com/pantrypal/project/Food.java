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

    public Integer getCal() {
        return calories;
    }

    public void setCal(Integer cal) {
        this.calories=cal;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User u) {
        this.user=u;
    }

    public Date getBuy() {
        return this.buyDate;
    }

    public void setBuy(Date d) {
        this.buyDate = d;
    }

    public Date getExp() {
        return this.expirationDate;
    }

    public void setExp(Date d) {
        this.expirationDate = d;
    }
}
