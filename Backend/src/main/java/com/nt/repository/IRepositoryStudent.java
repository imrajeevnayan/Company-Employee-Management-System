package com.nt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nt.entity.Student;

public interface IRepositoryStudent extends JpaRepository<Student, Long> {
	List<Student> findByStdName(String stdName);

	List<Student> findByStdEmail(String stdEmail);

	List<Student> findByStdMob(String stdMob);

	List<Student> findByStdState(String stdState);

	List<Student> findByStdDistrict(String stdDistrict);

	List<Student> findByStdCountry(String stdCountry);

}
