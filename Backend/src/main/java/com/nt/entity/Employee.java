package com.nt.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Employee")
@Data
public class Employee {
	@Id
	@SequenceGenerator(name = "gen7", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen7")
	private Long id;

	@Column(nullable = false, name = "empName")
	private String empName;
	
	@Column(nullable = false, name = "empEmail")
	private String empEmail;
	
	@Column(nullable = false, name = "empMob")
	private String empMob;
	
	@Column(nullable = false, name = "empCountry")
	private String empCountry;
	
	@Column(nullable = false, name = "empState")
	private String empState;
	
	@Column(nullable = false, name = "empDistrict")
	private String empDistrict;
	
	@Column(nullable = false, name = "empGender")
	private String empGender;
	
	@Column(nullable = false, name = "empLanguage")
	private List<String> empLanguage;
	
	
}
