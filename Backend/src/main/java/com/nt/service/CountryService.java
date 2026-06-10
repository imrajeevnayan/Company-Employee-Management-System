package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.Country;
import com.nt.repository.IRepositoryCountry;

@Service
public class CountryService implements ICountryMangementService {

    @Autowired
    private IRepositoryCountry repo;

    @Override
    public Country addNewCountry(Country c) {
        return repo.save(c);
    }
    @Override
    public List<Country> showAllCountry() {
        return repo.findAll();
    }
    @Override
    public Country getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Country not found"));
    }
    @Override
    public void deleteCountry(Long id) {
        repo.deleteById(id);
    }
}
