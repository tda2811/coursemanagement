package course.enzo.project.courseenzodemo.repository;

import course.enzo.project.courseenzodemo.model.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface CourseRepository extends CrudRepository<Course, Integer> {

    @Modifying
    @Query(value = "DELETE FROM Course WHERE idCourse = :id")
    void DeleteCourseByID(Integer id);
    @Query(value = "SELECT c.* FROM courses c ORDER BY c.cost",nativeQuery = true)
    List<Course> getAllCourse();
    @Query(value = "SELECT c FROM Course c WHERE c.idCourse = :id")
    Course getCourseByID(Integer id);
    @Modifying
    @Query(value = "INSERT INTO courses(cost, course_discription, src_image, name_course)\n" +
            "values (:cost,:disc,:src,:name)",nativeQuery = true)
    void createCourse(double cost,String disc,String src, String name);

}