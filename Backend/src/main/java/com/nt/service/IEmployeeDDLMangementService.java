package com.nt.service;

import java.util.List;

import com.nt.entity.EmployeeDDL;

public interface IEmployeeDDLMangementService {
	public EmployeeDDL addNewEmployee(EmployeeDDL emp);
	public List<EmployeeDDL> showAllEmployee() ;
}
