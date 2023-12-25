package course.enzo.project.courseenzodemo.controller;

import course.enzo.project.courseenzodemo.exception.ResourceNotFoundException;
import course.enzo.project.courseenzodemo.jwt.AuthTokenFilter;
import course.enzo.project.courseenzodemo.jwt.JwtTokenProvider;
import course.enzo.project.courseenzodemo.model.Course;
import course.enzo.project.courseenzodemo.model.ERole;
import course.enzo.project.courseenzodemo.model.Role;
import course.enzo.project.courseenzodemo.model.User;
import course.enzo.project.courseenzodemo.payload.request.RegisterRequest;
import course.enzo.project.courseenzodemo.payload.response.MessageResponse;
import course.enzo.project.courseenzodemo.repository.CourseRepository;
import course.enzo.project.courseenzodemo.repository.RoleRepository;
import course.enzo.project.courseenzodemo.repository.UserRepository;

import course.enzo.project.courseenzodemo.service.UpdateUserRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
@RestController
@Transactional
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200/")
public class AdminController {
    @Autowired
    private AuthTokenFilter authTokenFilter;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private HttpServletRequest request;

    //API USER
    @PostMapping("/admin/register")

    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsUserByUsername(registerRequest.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already"));
        }
        User user = new User();
        user.setFullname(registerRequest.getFullname());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setBalance(registerRequest.getBalance());
        Set<String> strRoles = registerRequest.getAuthorities();
        Set<Role> listRoles = new HashSet<>();
        Set<Course> listCourses = new HashSet<>();

        if(registerRequest.getSrcImageAvatar() == null){
            user.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/552/552721.png");
        }
        if(strRoles == null){
            Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).orElseThrow(()->new RuntimeException("Error: Role is not found"));
            listRoles.add(userRole);
        }else{
            strRoles.forEach(role->{
                if (role.equals("ROLE_ADMIN")){
                    user.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/172/172163.png");
                }
                else if (role.equals("ROLE_MODERATOR")){
                    user.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/3177/3177440.png");
                }else{
                    user.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/552/552721.png");
                }
            });
            strRoles.forEach(role->{
                switch (role){
                    case "ROLE_ADMIN":
                        Role adminRole = roleRepository.findByRoleName(ERole.ROLE_ADMIN).orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        listRoles.add(adminRole);
                        user.setBalance(9999);

                        courseRepository.findAll().forEach(course ->{
                            listCourses.add(course);
                        });

                    case "ROLE_MODERATOR":
                        Role moderatorRole = roleRepository.findByRoleName(ERole.ROLE_MODERATOR).orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        listRoles.add(moderatorRole);
                        user.setBalance(9999);
                        courseRepository.findAll().forEach(course ->{
                            listCourses.add(course);
                        });

                    case "ROLE_USER":
                        Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).orElseThrow(()->new RuntimeException("Error: Role is not found"));
                        listRoles.add(userRole);
                }
            });
        }
        user.setListRoles(listRoles);
        user.setListCourse(listCourses);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/admin/get-list-user")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> getListUser(){

        return userRepository.findAllUser();
    }
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex) {
        return ResponseEntity.badRequest().body(new MessageResponse("Access Denied"));
    }
    @DeleteMapping("/admin/delete/{username}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable String username){
        userRepository.deleteByUsername(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Delete successed", Boolean.TRUE);
        return ResponseEntity.ok(response);

    }
    @GetMapping("/admin/get-user/{username}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        User userResponse = userRepository.findByUsername(username);
        return ResponseEntity.ok(userResponse);
    }
    @PutMapping("/admin/update-user/{username}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<User>  updateUserByAdmin(@PathVariable String username, @RequestBody UpdateUserRequest updateUserRequest){
        User userResponse = userRepository.findByUsername(username);
        User userDetail = updateUserRequest.getUserDetail();
        Set<String> authorities = updateUserRequest.getAuthorities();
        Set<Role> listRoles = new HashSet<>();
        Set<Course> listCourses = new HashSet<>();
        authorities.forEach(role->{
            if(!role.equals("ROLE_MODERATOR")){
                Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).orElseThrow(()->new RuntimeException("Error: Role is not found"));
                listRoles.add(userRole);
                userDetail.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/552/552721.png");
                userResponse.setBalance(0);
                userResponse.setListCourse(userDetail.getListCourse());
            }
            else if(role.equals("ROLE_MODERATOR")) {
                Role moderatorRole = roleRepository.findByRoleName(ERole.ROLE_MODERATOR).orElseThrow(()->new RuntimeException("Error: Role is not found"));
                listRoles.add(moderatorRole);

                courseRepository.getAllCourse().forEach(course -> {
                    listCourses.add(course);
                });

                userResponse.setListCourse(listCourses);
                userResponse.setBalance(9999);
                userDetail.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/3177/3177440.png");
            }

        });
        if(userDetail.getFullname() != null || userDetail.getFullname() != ""){
            userResponse.setFullname(userDetail.getFullname());
        }
        if(userDetail.getSrcImageAvatar() != null ||userDetail.getSrcImageAvatar() != ""){
            userResponse.setSrcImageAvatar(userDetail.getSrcImageAvatar());
        }
        if(updateUserRequest.getNewPassword().length() != 0){
            String encodedNewPassword = encoder.encode(updateUserRequest.getNewPassword());
            userResponse.setPassword(encodedNewPassword);
        }
        if(userDetail.getBalance()>=0){
            userResponse.setBalance(userDetail.getBalance());
        }
        userResponse.setListRoles(listRoles);
        User userUpdate = userRepository.save(userResponse);
        return ResponseEntity.ok(userUpdate);
    }


    //API COURSE FOR ADMIN AND MODERATOR
    @PostMapping("/admin/create-course")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_MODERATOR')")
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        courseRepository.save(course);

        return ResponseEntity.ok(course);

    }

    @PutMapping("/admin/update-course/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_MODERATOR')")
    public ResponseEntity<?> updateCourse(@PathVariable Integer id, @RequestBody Course courseDetails) throws ResourceNotFoundException {

        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not exist with id :" + id));
        course.setNameCourse(courseDetails.getNameCourse());
        course.setDiscriptionCourse(courseDetails.getDiscriptionCourse());
        course.setCost(courseDetails.getCost());
        course.setImgCourse(courseDetails.getImgCourse());
        Course updatedCourse = courseRepository.save(course);
        return ResponseEntity.ok(updatedCourse);
    }
    @DeleteMapping("/admin/delete-user-course/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<?,?>> deleteUserCourse(@PathVariable Integer id){
        userRepository.deleteUserCourseByID(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Delete successed", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/admin/delete-course/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCourse(@PathVariable Integer id){
        courseRepository.DeleteCourseByID(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted successed", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/admin/add-course-for-admin&mod")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_MODERATOR')")
    public ResponseEntity<?> addNewCourseForAdminAndMod(@RequestBody Course course){
         List<User> listAdminAndMod = userRepository.getAdminsAndMods(2);
         listAdminAndMod.forEach((user -> {
             user.getListCourse().add(course);
             userRepository.save(user);
         }));
         return ResponseEntity.ok().body(listAdminAndMod);
    }
}
