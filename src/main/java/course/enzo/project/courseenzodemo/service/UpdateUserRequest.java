package course.enzo.project.courseenzodemo.service;

import course.enzo.project.courseenzodemo.model.User;

import java.util.Set;

public class UpdateUserRequest {
    private User userDetail;
    private String newPassword;
    private Set<String> authorities;

    public UpdateUserRequest(User userDetail, String newPassword, Set<String> authorities) {
        this.userDetail = userDetail;
        this.newPassword = newPassword;
        this.authorities = authorities;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    public User getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(User userDetail) {
        this.userDetail = userDetail;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}
