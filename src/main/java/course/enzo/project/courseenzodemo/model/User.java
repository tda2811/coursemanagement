package course.enzo.project.courseenzodemo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.*;

@Entity
@Table(	name = "Users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column(name = "full_name",nullable = false)
    private String fullname;
    @Column(name = "src_avatar",nullable = false)
    private String srcImageAvatar;
    @Column(name="balance",nullable = false)

    private double balance;
    @Column(name = "username", unique = true,nullable = false)
    private String username;
    @Column(name = "password",nullable = false)
    @JsonIgnore
    private String password;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "User_Roles",
            joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "role_id"))
    private Set<Role> listRoles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(	name = "User_Courses",
            joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id",referencedColumnName = "course_id"))

    private Set<Course> listCourse = new HashSet<>();

    public User() {
    }


    public String getSrcImageAvatar() {
        return srcImageAvatar;
    }

    public void setSrcImageAvatar(String srcImageAvatar) {
        this.srcImageAvatar = srcImageAvatar;
    }

    public Set<Course> getListCourse() {
        return listCourse;
    }

    public void setListCourse(Set<Course> listCourse) {
        this.listCourse = listCourse;
    }

    public User(String fullname, String username, String password) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public int getUserId() {
        return userId;
    }

    public void setId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getListRoles() {
        return listRoles;
    }

    public void setListRoles(Set<Role> listRoles) {
        this.listRoles = listRoles;
    }


}