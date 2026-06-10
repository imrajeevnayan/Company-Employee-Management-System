package com.nt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Country;

public interface IRepositoryCountry extends JpaRepository<Country, Long> {

}
