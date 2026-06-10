package com.nt.controler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nt.entity.Country;
import com.nt.entity.Language;
import com.nt.service.CountryService;
import com.nt.service.IStateMangementService;
import com.nt.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")  // allow React dev server
public class Contoller {

//    @Autowired
//    private UserService service;

    @Autowired
    private CountryService serviceCountry;

    @Autowired
    private IStateMangementService stateService;

    // ================= Language =================
//    @PostMapping("/addlang")
//    public Language newLanguage(@RequestBody Language newLang) {
//        return service.addNewLang(newLang);
//    }
//
//    @GetMapping("/users")
//    public List<Language> getAllUser() {
//        return service.showAllUser();
//    }
//    
//    @PutMapping("/update/{id}")
//    public Language updateLanguage(@PathVariable Long id, @RequestBody Language lang) {
//        return service.updateLang(id, lang);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public void deleteLanguage(@PathVariable Long id) {
//        service.deleteLang(id);
//    }

    // ================= Country =================
    @PostMapping(value = "/addcountry", consumes = {"multipart/form-data"})
    public Country addCountry(@RequestParam("countryName") String countryName,
                              @RequestParam("photoCandidate") MultipartFile photo) throws IOException {
        Country c = new Country();
        c.setCountryName(countryName);
        c.setPhotoCandidate(photo.getBytes());
        return serviceCountry.addNewCountry(c);
    }

    @GetMapping("/countries")
    public List<Map<String, Object>> getAllCountries() {
        List<Country> list = serviceCountry.showAllCountry();
        List<Map<String, Object>> res = new ArrayList<>();
        for (Country c : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("countryName", c.getCountryName());
            map.put("imageBase64", Base64.getEncoder().encodeToString(c.getPhotoCandidate()));
            res.add(map);
        }
        return res;
    }

    @PutMapping(value = "/updatecountry/{id}", consumes = {"multipart/form-data"})
    public Country updateCountry(@PathVariable Long id,
                                 @RequestParam("countryName") String countryName,
                                 @RequestParam(value = "photoCandidate", required = false) MultipartFile photo) throws IOException {
        Country c = serviceCountry.getById(id);
        c.setCountryName(countryName);
        if (photo != null && !photo.isEmpty()) {
            c.setPhotoCandidate(photo.getBytes());
        }
        return serviceCountry.addNewCountry(c);
    }

    @DeleteMapping("/deletecountry/{id}")
    public void deleteCountry(@PathVariable Long id) {
        serviceCountry.deleteCountry(id);
    }

}
