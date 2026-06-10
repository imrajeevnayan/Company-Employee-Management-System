package com.nt.service;

import java.util.List;

import com.nt.entity.Student;    
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IStudentMgmtService {
	List<Student> getAllStudents();
	Student addStudent(Student d);
	
    List<Student> getRecordByStdName(String stdName);
    List<Student> getRecordByStdEmail(String stdEmail);
    List<Student> getRecordByStdMob(String stdMob);
    List<Student> getRecordByStdState(String stdState);
    List<Student> getRecordByStdDistrict(String stdDistrict);
    List<Student> getRecordByStdCountry(String stdCountry);

    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
    


    Page<Student> getStudentsByPage(Pageable pageable);
}
