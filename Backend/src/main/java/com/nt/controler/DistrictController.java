package com.nt.controler;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nt.entity.District;
import com.nt.service.IDistrictService;

@RestController
@RequestMapping("/district")
@CrossOrigin(origins = "http://localhost:5173")
public class DistrictController {

    @Autowired
    private IDistrictService districtService;

    // ✅ Add new District
    @PostMapping("/add")
    public District addDistrict(@RequestBody District d) {
        return districtService.addDistrict(d);
    }

    // ✅ Get all districts
    @GetMapping("/all")
    public List<District> getAllDistricts() {
        return districtService.getAllDistricts();
    }

    // ✅ Get all unique countries
    @GetMapping("/countries")
    public List<String> getAllCountries() {
        return districtService.getAllDistricts()
                .stream()
                .map(District::getCountryName)
                .distinct()
                .collect(Collectors.toList());
    }

    // ✅ Get all unique states for a given country
    @GetMapping("/states/{countryName}")
    public List<String> getStatesByCountry(@PathVariable String countryName) {
        return districtService.getAllDistricts()
                .stream()
                .filter(d -> d.getCountryName().equals(countryName))
                .map(District::getStateName)
                .distinct()
                .collect(Collectors.toList());
    }
    
    
    // ✅ Delete specific District
    @DeleteMapping("/delete/{id}")
    public String deleteDistrict(@PathVariable Long id) {
        districtService.deleteDistrict(id);
        return "District deleted successfully";
    }

    // ✅ Update specific District
    @PutMapping("/update/{id}")
    public District updateDistrict(@PathVariable Long id, @RequestBody District updatedDistrict) {
        District existing = districtService.getDistrictById(id);
        if (existing != null) {
            existing.setCountryName(updatedDistrict.getCountryName());
            existing.setStateName(updatedDistrict.getStateName());
            existing.setDistrictName(updatedDistrict.getDistrictName());
            return districtService.addDistrict(existing);
        }
        return null;
    }
}
