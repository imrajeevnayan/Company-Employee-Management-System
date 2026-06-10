package com.nt.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Students")
@Data
public class Student {
	@Id
	@SequenceGenerator(name = "gen6", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen6")
	private Long id;

	@Column(name = "stdName")
	private String stdName;

	@Column(name = "stdEmail")
	private String stdEmail;

	@Column(name = "stdMob")
	private String stdMob;

	@Column(name = "stdState")
	private String stdState;

	@Column(name = "stdDistrict")
	private String stdDistrict;

	@Column(name = "stdCountry")
	private String stdCountry;

	@Column(name = "stdGender")
	private String stdGender;
}
