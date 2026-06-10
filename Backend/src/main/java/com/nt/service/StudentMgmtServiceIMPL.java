package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.nt.entity.Student;
import com.nt.repository.IRepositoryStudent;

@Service
public class StudentMgmtServiceIMPL implements IStudentMgmtService {

    @Autowired
    private IRepositoryStudent repo;

    @Override
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @Override
    public Student addStudent(Student d) {
        return repo.save(d);
    }

    @Override
    public List<Student> getRecordByStdName(String stdName) {
        return repo.findByStdName(stdName);
    }

    @Override
    public List<Student> getRecordByStdEmail(String stdEmail) {
        return repo.findByStdEmail(stdEmail);
    }

    @Override
    public List<Student> getRecordByStdMob(String stdMob) {
        return repo.findByStdMob(stdMob);
    }

    @Override
    public List<Student> getRecordByStdState(String stdState) {
        return repo.findByStdState(stdState);
    }

    @Override
    public List<Student> getRecordByStdDistrict(String stdDistrict) {
        return repo.findByStdDistrict(stdDistrict);
    }

    @Override
    public List<Student> getRecordByStdCountry(String stdCountry) {
        return repo.findByStdCountry(stdCountry);
    }
    
    @Override
    public Student updateStudent(Long id, Student student) {
        Student existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
        existing.setStdName(student.getStdName());
        existing.setStdEmail(student.getStdEmail());
        existing.setStdMob(student.getStdMob());
        existing.setStdCountry(student.getStdCountry());
        existing.setStdState(student.getStdState());
        existing.setStdDistrict(student.getStdDistrict());
        existing.setStdGender(student.getStdGender());
        return repo.save(existing);
    }

    @Override
    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }
    
    @Override
    public Page<Student> getStudentsByPage(Pageable pageable) {
        return repo.findAll(pageable);
    }
}
