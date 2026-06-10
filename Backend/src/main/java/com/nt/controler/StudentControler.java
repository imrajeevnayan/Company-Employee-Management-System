package com.nt.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import com.nt.entity.Student;
import com.nt.service.IStudentMgmtService;

@RestController
@RequestMapping("/students") 
@CrossOrigin(origins = "http://localhost:5173")
public class StudentControler {
    @Autowired
    private IStudentMgmtService service;

    // ✅ Add a new student
    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student savedStudent = service.addStudent(student);
        return ResponseEntity.ok(savedStudent);
    }

    // ✅ Retrieve all students
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> list = service.getAllStudents();
        return ResponseEntity.ok(list);
    }
    
    
    @GetMapping("/search/name/{stdName}")
    public ResponseEntity<List<Student>> getByStdName(@PathVariable String stdName) {
        return ResponseEntity.ok(service.getRecordByStdName(stdName));
    }

    @GetMapping("/search/email/{stdEmail}")
    public ResponseEntity<List<Student>> getByStdEmail(@PathVariable String stdEmail) {
        return ResponseEntity.ok(service.getRecordByStdEmail(stdEmail));
    }

    @GetMapping("/search/mob/{stdMob}")
    public ResponseEntity<List<Student>> getByStdMob(@PathVariable String stdMob) {
        return ResponseEntity.ok(service.getRecordByStdMob(stdMob));
    }

    @GetMapping("/search/state/{stdState}")
    public ResponseEntity<List<Student>> getByStdState(@PathVariable String stdState) {
        return ResponseEntity.ok(service.getRecordByStdState(stdState));
    }

    @GetMapping("/search/district/{stdDistrict}")
    public ResponseEntity<List<Student>> getByStdDistrict(@PathVariable String stdDistrict) {
        return ResponseEntity.ok(service.getRecordByStdDistrict(stdDistrict));
    }
    
    @GetMapping("/search/country/{stdCountry}")
    public ResponseEntity<List<Student>> getByStdCountry(@PathVariable String stdCountry) {
        return ResponseEntity.ok(service.getRecordByStdCountry(stdCountry));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        Student updated = service.updateStudent(id, student);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
        return ResponseEntity.ok("Student deleted successfully");
    }
    
    
    @GetMapping("/page")
    public ResponseEntity<Page<Student>> getStudentsByPage(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Student> page = service.getStudentsByPage(pageable);
        return ResponseEntity.ok(page);
    }

}
