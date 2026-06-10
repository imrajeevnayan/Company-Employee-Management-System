package com.nt.service;

import java.util.List;

import com.nt.entity.Employee;

public interface IEmployeeMangementService {
	public Employee addNewEmployee(Employee emp);
	public List<Employee> showAllEmployee() ;
}
