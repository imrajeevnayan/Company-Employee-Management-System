package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.Country;
import com.nt.entity.Language;
import com.nt.repository.IRepositoryCountry;
import com.nt.repository.IRepositoryLanguage;

@Service
public class UserService implements IUserMangementService {
	@Autowired
	private IRepositoryLanguage repo;
	@Autowired
	private IRepositoryCountry repoCountry;
	
	@Override
	public List<Language> getAllLanguages() {
		List<Language> all = repo.findAll();
		return all;
	}

	@Override
	public Language addNewLang(Language user) {
		Language save = repo.save(user);
		return save;
	}

	@Override
	public Country addNewCountry(Country con) {
		Country save = repoCountry.save(con);
		return save;
	}

	@Override
	public List<Country> showAllCountry() {
		List<Country> all = repoCountry.findAll();
		return all;
	}

	@Override
	public Language updateLang(Long id, Language lang) {
		Language existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Language not found"));
        existing.setLanguage(lang.getLanguage());
        return repo.save(existing);
	}
	
	@Override
	public void deleteLang(Long id) {
		repo.deleteById(id);		
	}
}
