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
import org.springframework.web.bind.annotation.RestController;

import com.nt.entity.Employee;
import com.nt.repository.IRepositoryEmployee;
import com.nt.repository.IRepositoryEmployeeDDL;
import com.nt.service.IEmployeeMangementService;

@RestController
@RequestMapping("/employees") 
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeControler {
	@Autowired
    private IEmployeeMangementService service;
	
	@Autowired
    private IRepositoryEmployee repo;
	
	 // ✅ Add a new student
    @PostMapping("/add")
    public ResponseEntity<Employee> addStudent(@RequestBody Employee emp) {
    	Employee savedEmp = service.addNewEmployee(emp);
        return ResponseEntity.ok(savedEmp);
    }

    // ✅ Retrieve all students
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllStudents() {
        List<Employee> list = service.showAllEmployee();
        return ResponseEntity.ok(list);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee emp) {
        Employee existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        existing.setEmpName(emp.getEmpName());
        existing.setEmpEmail(emp.getEmpEmail());
        existing.setEmpMob(emp.getEmpMob());
        existing.setEmpCountry(emp.getEmpCountry());
        existing.setEmpState(emp.getEmpState());
        existing.setEmpDistrict(emp.getEmpDistrict());
        existing.setEmpGender(emp.getEmpGender());
        existing.setEmpLanguage(emp.getEmpLanguage());
        repo.save(existing);
        return ResponseEntity.ok(existing);
    }
}
