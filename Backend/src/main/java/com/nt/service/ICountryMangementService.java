package com.nt.service;

import java.util.List;

import com.nt.entity.Country;

public interface ICountryMangementService {

	Country addNewCountry(Country c);

	List<Country> showAllCountry();

	Country getById(Long id);

	void deleteCountry(Long id);
	
}
