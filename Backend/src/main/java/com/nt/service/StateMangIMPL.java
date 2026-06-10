package com.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nt.entity.Country;
import com.nt.entity.States;
import com.nt.repository.IRepositoryState;

@Service
public class StateMangIMPL implements IStateMangementService {
	@Autowired
	private IRepositoryState repo;

	@Override
	public States addNewState(States s) {
		States save = repo.save(s);
		return save;
	}

	@Override
	public List<States> showAllCountry() {
		List<States> all = repo.findAll();
		return all;
	}

	@Override
	public States getById(Long id) {
		States states = repo.findById(id).orElseThrow(()-> new IllegalArgumentException("Id not found"));
		return states;
	}

	@Override
	public void deleteState(Long id) {
		repo.deleteById(id);
	}

}
