package course.enzo.project.courseenzodemo.model;

import jakarta.persistence.*;
@Entity
@Table(name = "rates")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer quantityRate;
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;
    @JoinColumn(name = "course_id")
    @ManyToOne
    private Course course;

    public Rate(Integer id, Integer quantityRate, User user, Course course) {
        this.id = id;
        this.quantityRate = quantityRate;
        this.user = user;
        this.course = course;
    }
    public Rate(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQuantityRate() {
        return quantityRate;
    }

    public void setQuantityRate(Integer quantityRate) {
        this.quantityRate = quantityRate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
