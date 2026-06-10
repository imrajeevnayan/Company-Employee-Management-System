package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.Employee;
import com.nt.repository.IRepositoryEmployee;

@Service
public class EmployeeServiceIMPL implements IEmployeeMangementService {
	@Autowired
	private IRepositoryEmployee repo;
	
	@Override
	public Employee addNewEmployee(Employee emp) {
		Employee save = repo.save(emp);
		return save;
	}

	@Override
	public List<Employee> showAllEmployee() {
		List<Employee> all = repo.findAll();
		return all;
	}



}
