package com.nt.controler;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.nt.entity.Language;
import com.nt.service.IUserMangementService;

@RestController
@RequestMapping("/language")
@CrossOrigin(origins = "http://localhost:5173")
public class LanguageController {

    @Autowired
    private IUserMangementService service;

    @PostMapping("/add")
    public Language addLanguage(@RequestBody Language lang) {
        return service.addNewLang(lang);
    }

    @GetMapping("/all")
    public List<Language> getAllLanguages() {
        return service.getAllLanguages();
    }

    @PutMapping("/update/{id}")
    public Language updateLanguage(@PathVariable Long id, @RequestBody Language lang) {
        return service.updateLang(id, lang);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLanguage(@PathVariable Long id) {
        service.deleteLang(id);
    }
}
