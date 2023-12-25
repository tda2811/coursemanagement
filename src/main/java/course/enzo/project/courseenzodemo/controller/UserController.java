package course.enzo.project.courseenzodemo.controller;

import course.enzo.project.courseenzodemo.exception.ResourceNotFoundException;
import course.enzo.project.courseenzodemo.jwt.AuthTokenFilter;
import course.enzo.project.courseenzodemo.jwt.JwtTokenProvider;
import course.enzo.project.courseenzodemo.model.*;
import course.enzo.project.courseenzodemo.payload.request.LoginRequest;
import course.enzo.project.courseenzodemo.payload.request.RegisterRequest;
import course.enzo.project.courseenzodemo.payload.response.JwtResponse;
import course.enzo.project.courseenzodemo.payload.response.MessageResponse;
import course.enzo.project.courseenzodemo.repository.CourseRepository;
import course.enzo.project.courseenzodemo.repository.RoleRepository;
import course.enzo.project.courseenzodemo.repository.UserRepository;
import course.enzo.project.courseenzodemo.security.UserDetailsImple;
import course.enzo.project.courseenzodemo.service.UpdateUserRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@Transactional
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    //start authentication
    @Autowired
    private AuthenticationManager authenticationManager;
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
    private HttpServletRequest request;
    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){

        if(userRepository.existsUserByUsername(registerRequest.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already"));
        }
        User user = new User();
        user.setFullname(registerRequest.getFullname());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setBalance(0);
        Set<Role> listRoles = new HashSet<>();
        if(registerRequest.getSrcImageAvatar() == null){
            user.setSrcImageAvatar("https://cdn-icons-png.flaticon.com/512/552/552721.png");
        }
        Role userRole = roleRepository.findByRoleName(ERole.ROLE_USER).orElseThrow(()->new RuntimeException("Error: Role is not found"));
        listRoles.add(userRole);
        user.setListRoles(listRoles);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest){
        if(!userRepository.existsUserByUsername(loginRequest.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username or password is incorrect"));
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImple userDetailsImple = (UserDetailsImple) authentication.getPrincipal();
        String jwt = jwtTokenProvider.generateJwtToken(userDetailsImple);
        List<String> listRoles = userDetailsImple.getAuthorities().stream()
                .map(role->role.getAuthority()).collect(Collectors.toList());
        List<Integer> listCourse = new ArrayList<>();
        userDetailsImple.getCourses().forEach(course->listCourse.add(course));
        return ResponseEntity.ok(new JwtResponse(userDetailsImple.getId(),jwt,userDetailsImple.getFullname(),userDetailsImple.getSrcImageAvatar(),userDetailsImple.getBalance(),userDetailsImple.getUsername(),listRoles,listCourse));

    }
    @GetMapping("/user/profile")
    public UserDetailsImple getProfileUser(@AuthenticationPrincipal UserDetailsImple userDetailsImple){
        return userDetailsImple;
    }

    @PutMapping("/user/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest updateUserRequest,@AuthenticationPrincipal UserDetailsImple userDetailsImple) {
        User userDetail = updateUserRequest.getUserDetail();
        String username = userDetailsImple.getUsername();
        User user = userRepository.findByUsername(username);
        if(updateUserRequest.getNewPassword().length()!=0){
            String encodedNewPassword = encoder.encode(updateUserRequest.getNewPassword());
            userRepository.updateUserByUsername(userDetail.getFullname(),userDetail.getSrcImageAvatar(),encodedNewPassword,username);
        }else{
            String encodedNewPassword = user.getPassword();
            userRepository.updateUserByUsername(userDetail.getFullname(),userDetail.getSrcImageAvatar(),encodedNewPassword,username);
        }
        return ResponseEntity.ok().body(new MessageResponse("Update successed"));
    }
    @PutMapping("/user/deposit")
    public ResponseEntity<?> depositToAccount(@RequestBody double amountOfMoney,@AuthenticationPrincipal UserDetailsImple userDetailsImple){
        String username = userDetailsImple.getUsername();
        User user = userRepository.findByUsername(username);
        user.setBalance(user.getBalance() + amountOfMoney);
        User userUpdate = userRepository.save(user);
        return ResponseEntity.ok(userUpdate);
    }
}
