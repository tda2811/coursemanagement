package course.enzo.project.courseenzodemo.repository;

import course.enzo.project.courseenzodemo.model.Comment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment,Integer> {
    @Query(value = "SELECT * FROM getListCommentsByIDCourse(:id)",nativeQuery = true)
    List<?> getListCommentByIDCourse(Integer id);
    @Modifying
    @Query(value = "INSERT comments VALUES('20230905',:content,:idCourse,:idUser)",nativeQuery = true)
    void postComment(String content,Integer idCourse , Integer idUser);
    @Modifying
    @Query(value = "UPDATE comments SET comment_text = :newcontent where id = :id",nativeQuery = true)
    void updateComment(String newcontent, Integer id);
    @Query(value = "SELECT c.* FROM comments c WHERE id = : id",nativeQuery = true)
    Comment getCommentByID(Integer id);
    @Modifying
    @Query(value = "DELETE FROM comments WHERE id = :id",nativeQuery = true)
    void deleteCommentByIdComment(Integer id);
    @Modifying
    @Query(value = "DELETE FROM comments WHERE course_id = :id",nativeQuery = true)
    void deleteCommentByIdCourse(Integer id);

}
