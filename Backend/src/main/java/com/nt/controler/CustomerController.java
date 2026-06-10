package com.nt.controler;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nt.entity.Customer;
import com.nt.service.ICustomerMgmtService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private ICustomerMgmtService service;

    // DTO class to receive JSON
    public static class CustomerDTO {
        public String custName;
        public String custEmail;
        public String custMob;
        public String photo;
    }

    // ✅ Add new customer
    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody CustomerDTO dto) {
        Customer c = new Customer();
        c.setCustName(dto.custName);
        c.setCustEmail(dto.custEmail);
        c.setCustMob(dto.custMob);

        if (dto.photo != null && !dto.photo.isEmpty()) {
            String base64Data = dto.photo.split(",")[1];
            byte[] photoBytes = Base64.getDecoder().decode(base64Data);
            c.setPhotoxxx(photoBytes);
        }

        Customer saved = service.addCustomer(c);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get all customers
    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> list = service.getAllCustomers();
        return ResponseEntity.ok(list);
    }

    // ✅ Update specific customer
    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO dto) {
        Customer updated = service.updateCustomer(id, dto);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete specific customer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        service.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}
