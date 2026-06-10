package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.EmployeeDDL;
import com.nt.repository.IRepositoryEmployeeDDL;

@Service
public class EmployeeDDLServiceIMPL implements IEmployeeDDLMangementService {
	@Autowired
	private IRepositoryEmployeeDDL repo;

	@Override
	public EmployeeDDL addNewEmployee(EmployeeDDL emp) {
		EmployeeDDL save = repo.save(emp);
		return save;
	}

	@Override
	public List<EmployeeDDL> showAllEmployee() {
		List<EmployeeDDL> all = repo.findAll();
		return all;
	}
	
	



}
