package com.nt.service;

import java.util.List;

import com.nt.entity.District;

public interface IDistrictService {
    District addDistrict(District d);
    List<District> getAllDistricts();
	void deleteDistrict(Long id);
	District getDistrictById(Long id);
}
