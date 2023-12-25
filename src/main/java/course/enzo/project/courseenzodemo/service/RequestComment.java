package course.enzo.project.courseenzodemo.service;

import course.enzo.project.courseenzodemo.model.Course;
import course.enzo.project.courseenzodemo.model.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RequestComment {
    private String comment_text;
    private Integer course_id;
    private Integer user_id;

    public String getComment_text() {
        return comment_text;
    }

    public void setComment_text(String comment_text) {
        this.comment_text = comment_text;
    }

    public Integer getCourse_id() {
        return course_id;
    }

    public void setCourse_id(Integer course_id) {
        this.course_id = course_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
}
