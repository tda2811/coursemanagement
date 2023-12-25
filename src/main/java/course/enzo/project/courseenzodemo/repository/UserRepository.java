package course.enzo.project.courseenzodemo.repository;

import course.enzo.project.courseenzodemo.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Integer> {

    @Query(value = "SELECT u FROM User u WHERE u.username = :username")
    User findByUsername(String username);
    Boolean existsUserByUsername(String username);
    @Query(value = "SELECT u FROM User u ORDER BY u.username")
    List<User> findAllUser();
    //procedure
    @Modifying
    @Query(value = "EXEC dbo.UpdateUser :fullname, :src, :newpassword, :username",nativeQuery = true)
    void updateUserByUsername(String fullname,String src,String newpassword, String username);
    @Modifying
    @Query(value="DELETE FROM User WHERE username = :username ")
    void deleteByUsername(String username);
    @Modifying
    @Query(value = "DELETE FROM User_Courses WHERE course_id = :id",nativeQuery = true)
    void deleteUserCourseByID(Integer id);
    //function
    @Query(value = "SELECT * FROM dbo.GetAdminsAndMods(:id)",nativeQuery = true)
    List<User> getAdminsAndMods(Integer id);
    @Query(value = "SELECT dbo.GetCountUserSubcribeCourse(:id)",nativeQuery = true)
    Integer getCountUserSubcribeCourse(Integer id);

}