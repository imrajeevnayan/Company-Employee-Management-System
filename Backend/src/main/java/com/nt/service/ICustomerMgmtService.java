package com.nt.service;

import java.util.List;

import com.nt.controler.CustomerController;
import com.nt.entity.Customer;

public interface ICustomerMgmtService {
    List<Customer> getAllCustomers();
	Customer addCustomer(Customer d);
	Customer updateCustomer(Long id, CustomerController.CustomerDTO dto);
	void deleteCustomer(Long id);

}
