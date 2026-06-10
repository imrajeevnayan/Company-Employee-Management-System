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

import com.nt.entity.EmployeeDDL;
import com.nt.repository.IRepositoryEmployeeDDL;
import com.nt.service.IEmployeeDDLMangementService;

@RestController
@RequestMapping("/employeesddl")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeControllerDDL {

    @Autowired
    private IEmployeeDDLMangementService service;

    @Autowired
    private IRepositoryEmployeeDDL repo;

    // ✅ Add a new employee
    @PostMapping("/add")
    public ResponseEntity<EmployeeDDL> addEmployee(@RequestBody EmployeeDDL emp) {
        EmployeeDDL savedEmp = service.addNewEmployee(emp);
        return ResponseEntity.ok(savedEmp);
    }

    // ✅ Retrieve all employees
    @GetMapping("/all")
    public ResponseEntity<List<EmployeeDDL>> getAllEmployees() {
        List<EmployeeDDL> list = service.showAllEmployee();
        return ResponseEntity.ok(list);
    }

    // ✅ Delete employee by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(404).body("Employee not found");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ Update employee by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<EmployeeDDL> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDDL emp) {
        EmployeeDDL existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        existing.setEmpDName(emp.getEmpDName());
        existing.setEmpDEmail(emp.getEmpDEmail());
        existing.setEmpDMob(emp.getEmpDMob());
        existing.setEmpDCountry(emp.getEmpDCountry());
        existing.setEmpDState(emp.getEmpDState());
        existing.setEmpDDistrict(emp.getEmpDDistrict());
        existing.setEmpDGender(emp.getEmpDGender());
        existing.setEmpDLanguage(emp.getEmpDLanguage());

        EmployeeDDL updated = repo.save(existing);
        return ResponseEntity.ok(updated);
    }
}
