package com.nt.service;

import java.util.List;

import com.nt.entity.States;

public interface IStateMangementService {

	States addNewState(States s);

	List<States> showAllCountry();

	States getById(Long id);

	void deleteState(Long id);
	
}
