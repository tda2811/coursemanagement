package course.enzo.project.courseenzodemo.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String commentText;
    private Date commentDate;
    @ManyToOne
    @JoinColumn(name  = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name  = "course_id")
    private Course course;

    public Comment(Integer id, String commentText, Date commentDate) {
        this.id = id;
        this.commentText = commentText;
        this.commentDate = commentDate;
    }
    public Comment(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
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
