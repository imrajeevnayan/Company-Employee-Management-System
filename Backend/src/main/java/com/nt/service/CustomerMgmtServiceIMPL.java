package com.nt.service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.controler.CustomerController.CustomerDTO;
import com.nt.entity.Customer;
import com.nt.repository.ICustomerRepository;

@Service
public class CustomerMgmtServiceIMPL implements ICustomerMgmtService {
	@Autowired
	private ICustomerRepository repo;

	@Override
	public Customer addCustomer(Customer d) {
		Customer save = repo.save(d);
		return save;
	}

	@Override
	public List<Customer> getAllCustomers() {
		List<Customer> all = repo.findAll();
		return all;
	}


    @Override
    public Customer updateCustomer(Long id, CustomerDTO dto) {
        Optional<Customer> opt = repo.findById(id);
        if (opt.isPresent()) {
            Customer c = opt.get();
            c.setCustName(dto.custName);
            c.setCustEmail(dto.custEmail);
            c.setCustMob(dto.custMob);

            // Update photo if provided
            if (dto.photo != null && !dto.photo.isEmpty()) {
                String base64Data = dto.photo.split(",")[1];
                byte[] photoBytes = Base64.getDecoder().decode(base64Data);
                c.setPhotoxxx(photoBytes);
            }

            return repo.save(c);
        } else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }

    @Override
    public void deleteCustomer(Long id) {
        Optional<Customer> opt = repo.findById(id);
        if (opt.isPresent()) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }

	
}
