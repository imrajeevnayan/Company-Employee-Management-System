package com.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.District;
import com.nt.repository.IDistrictRepository;

@Service
public class DistrictServiceImpl implements IDistrictService {

    @Autowired
    private IDistrictRepository repo;

    @Override
    public District addDistrict(District d) {
        return repo.save(d);
    }

    @Override
    public List<District> getAllDistricts() {
        return repo.findAll();
    }

    @Override
    public District getDistrictById(Long id) {
        Optional<District> district = repo.findById(id);
        return district.orElseThrow(() -> new RuntimeException("District not found with ID: " + id));
    }

    // Optional - If you want to allow district updates
    public District updateDistrict(Long id, District updatedDistrict) {
        District existing = getDistrictById(id);
        existing.setCountryName(updatedDistrict.getCountryName());
        existing.setStateName(updatedDistrict.getStateName());
        existing.setDistrictName(updatedDistrict.getDistrictName());
        return repo.save(existing);
    }

	@Override
	public void deleteDistrict(Long id) {
		if (repo.existsById(id)) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("District not found with ID: " + id);
        }
	}
}
