package course.enzo.project.courseenzodemo.payload.request;

import java.util.Set;

public class RegisterRequest {
    private String fullname;
    private String username;
    private String password;
    private String srcImageAvatar;
    private Set<String> authorities;
    private Set<Integer> listCourse;
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getFullname() {
        return fullname;
    }

    public String getSrcImageAvatar() {
        return srcImageAvatar;
    }

    public void setSrcImageAvatar(String srcImageAvatar) {
        this.srcImageAvatar = srcImageAvatar;
    }

    public Set<Integer> getListCourse() {
        return listCourse;
    }

    public void setListCourse(Set<Integer> listCourse) {
        this.listCourse = listCourse;
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

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }
}
