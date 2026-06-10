package com.nt.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.States;

public interface IRepositoryState extends JpaRepository<States, Long> {

}
