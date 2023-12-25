package course.enzo.project.courseenzodemo.payload.response;

import java.util.List;
import java.util.Map;

public class JwtResponse {
    private String token;
    private int id;
    private String type = "Bearer";
    private String fullname;
    private String srcImageAvatar;
    private double balance;
    private String username;
    private List<String> listRoles;
    private List<Integer> listCourse;

    public JwtResponse(int id,String token,String fullname,String srcImageAvatar,double balance, String username, List<String> listRoles, List<Integer> listCourse) {
        this.id = id;
        this.token = token;
        this.fullname =fullname;
        this.srcImageAvatar = srcImageAvatar;
        this.balance = balance;
        this.username = username;
        this.listRoles = listRoles;
        this.listCourse = listCourse;

    }
    public JwtResponse() {

    }



    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getSrcImageAvatar() {
        return srcImageAvatar;
    }

    public void setSrcImageAvatar(String srcImageAvatar) {
        this.srcImageAvatar = srcImageAvatar;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Integer> getListCourse() {
        return listCourse;
    }

    public void setListCourse(List<String> listCourses) {
        this.listCourse = listCourse;
    }

    public List<String> getListRoles() {
        return listRoles;
    }

    public void setListRoles(List<String> listRoles) {
        this.listRoles = listRoles;
    }
}
