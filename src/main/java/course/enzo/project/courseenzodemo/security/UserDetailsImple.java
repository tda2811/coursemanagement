package course.enzo.project.courseenzodemo.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import course.enzo.project.courseenzodemo.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

public class UserDetailsImple implements UserDetails {
    private static final long serialVersionUID = 1L;
    private int id;
    private String fullname;
    private String srcImageAvatar;
    private double balance;
    private String username;
    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    private List<Integer> courses;
    public UserDetailsImple(int id,String fullname,String srcImageAvatar,double balance, String username, String password,
                            Collection<? extends GrantedAuthority> authorities,
                            List<Integer> courses) {
        this.id = id;
        this.fullname = fullname;
        this.srcImageAvatar = srcImageAvatar;
        this.balance = balance;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.courses = courses;

    }
    public UserDetailsImple() {}

    public static UserDetailsImple build(User user) {
        List<GrantedAuthority> authorities = user.getListRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName().name()))
                .collect(Collectors.toList());
        List<Integer> courses = new ArrayList<>();
        user.getListCourse().forEach((course -> courses.add(course.getIdCourse())));

        return new UserDetailsImple(
                user.getUserId(),
                user.getFullname(),
                user.getSrcImageAvatar(),
                user.getBalance(),
                user.getUsername(),
                user.getPassword(),
                authorities,
                courses);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }



    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public List<Integer> getCourses() {
        return courses;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSrcImageAvatar() {
        return srcImageAvatar;
    }

    public void setSrcImageAvatar(String srcImageAvatar) {
        this.srcImageAvatar = srcImageAvatar;
    }



    public String getFullname() {
        return fullname;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImple user = (UserDetailsImple) o;
        return Objects.equals(id, user.id);
    }
}
