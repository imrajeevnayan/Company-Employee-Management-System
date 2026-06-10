package com.nt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Employee;

public interface IRepositoryEmployee extends JpaRepository<Employee, Long> {

}
