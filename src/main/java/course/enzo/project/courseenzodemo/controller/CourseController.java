package course.enzo.project.courseenzodemo.controller;

import course.enzo.project.courseenzodemo.exception.ResourceNotFoundException;
import course.enzo.project.courseenzodemo.model.Comment;
import course.enzo.project.courseenzodemo.model.Course;
import course.enzo.project.courseenzodemo.model.User;
import course.enzo.project.courseenzodemo.payload.response.MessageResponse;
import course.enzo.project.courseenzodemo.repository.CommentRepository;
import course.enzo.project.courseenzodemo.repository.CourseRepository;
import course.enzo.project.courseenzodemo.repository.UserRepository;
import course.enzo.project.courseenzodemo.security.UserDetailsImple;
import course.enzo.project.courseenzodemo.service.RequestComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Transactional
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;
    @GetMapping("/courses")
    public List<Course> getAllEmployees(){
        return courseRepository.getAllCourse();
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Integer id) throws ResourceNotFoundException {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not exist with id :" + id));

        return ResponseEntity.ok(course);
    }

    @PutMapping("/courses/{username}/bought-course-{id}")
    public ResponseEntity<User> updateListCourses(@PathVariable Integer id, @RequestBody String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not exist with id :" + id));
        UserDetailsImple userDetailsImple = new UserDetailsImple();
        user.getListCourse().add(course);
        userDetailsImple.build(user);
        User userUpdate = userRepository.save(user);
        return ResponseEntity.ok(userUpdate);
    }
    @GetMapping("/courses/mycourses")
    public List<Course> getUserCourses(@AuthenticationPrincipal UserDetailsImple userDetailsImple){
            List<Integer> listIDCourse = new ArrayList<>();
            userDetailsImple.getCourses().forEach(course->listIDCourse.add(course));
            List<Course> listCourses = new ArrayList<>();
            listIDCourse.forEach(id-> listCourses.add(courseRepository.getCourseByID(id)));
            return listCourses;
    }
    @GetMapping("/courses/get-count-subcribe-course/{id}")
    public ResponseEntity<?> getCountSubcribeCourse(@PathVariable Integer id){
            Integer count = userRepository.getCountUserSubcribeCourse(id);
            return ResponseEntity.ok(count);
    }
    //comment
    @GetMapping("/courses/get-comments/{id}")
    public  ResponseEntity<?> getListComment(@PathVariable Integer id){
            List<?> listComments = commentRepository.getListCommentByIDCourse(id);
            return ResponseEntity.ok(listComments);
    }
    @PostMapping("/courses/post-comment")
    public ResponseEntity<?> postComment(@AuthenticationPrincipal UserDetailsImple userDetailsImple, @RequestBody RequestComment requestComment){
            commentRepository.postComment(requestComment.getComment_text(),requestComment.getCourse_id(),userDetailsImple.getId());
            return ResponseEntity.ok(new MessageResponse("Post successed"));
        }
    @PutMapping("/courses/update-comment/{id}")
        public ResponseEntity<?> updateComment(@PathVariable Integer id,@RequestBody String content){
            commentRepository.updateComment(content,id);
            Map<String,Boolean> noti = new HashMap<>();
            noti.put("updated",Boolean.TRUE);
            return ResponseEntity.ok(noti);
        }
    @DeleteMapping("/courses/delete-comment/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
        public ResponseEntity<?> deleteCommentById(@PathVariable Integer id){
            commentRepository.deleteCommentByIdCourse(id);
            Map<String,Boolean> noti = new HashMap<>();
            noti.put("Deleted",Boolean.TRUE);
            return ResponseEntity.ok(noti);
        }
    @DeleteMapping("/courses/delete-comment-by-user/{id}")
        public ResponseEntity<?> deleteCommentByIdComment(@PathVariable Integer id){
            commentRepository.deleteCommentByIdComment(id);
            Map<String,Boolean> noti = new HashMap<>();
            noti.put("Deleted",Boolean.TRUE);
            return ResponseEntity.ok(noti);
        }
}
