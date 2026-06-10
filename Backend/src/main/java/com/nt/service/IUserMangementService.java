package com.nt.service;

import java.util.List;

import com.nt.entity.Country;
import com.nt.entity.Language;

public interface IUserMangementService {
	public Language addNewLang(Language user);
	public Country addNewCountry(Country con);
	List<Language> getAllLanguages();
	List<Country> showAllCountry();
	Language updateLang(Long id, Language lang);
	void deleteLang(Long id);
}
