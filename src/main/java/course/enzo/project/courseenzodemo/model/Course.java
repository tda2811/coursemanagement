package course.enzo.project.courseenzodemo.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "courses")

public class Course {
    @Id
    @Column(name = "course_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCourse;
    @Column(name = "src_image", nullable = false)
    private String imgCourse;
    @Column(name = "name_course", nullable = false)
    private String nameCourse;
    @Column(name = "course_discription", nullable = false)
    private String discriptionCourse;
    @Column(name = "cost", nullable = false)
    private double cost;

    public Course() {

    }

    public Course(int idCourse, String imgCourse, String nameCourse, String discriptionCourse, double cost) {
        this.idCourse = idCourse;
        this.imgCourse = imgCourse;
        this.nameCourse = nameCourse;
        this.discriptionCourse = discriptionCourse;
        this.cost = cost;
    }

    public int getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(int idCourse) {
        this.idCourse = idCourse;
    }

    public String getImgCourse() {
        return imgCourse;
    }

    public void setImgCourse(String imgCourse) {
        this.imgCourse = imgCourse;
    }


    public String getNameCourse() {
        return nameCourse;
    }

    public void setNameCourse(String nameCourse) {
        this.nameCourse = nameCourse;
    }

    public String getDiscriptionCourse() {
        return discriptionCourse;
    }

    public void setDiscriptionCourse(String discriptionCourse) {
        this.discriptionCourse = discriptionCourse;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }


}