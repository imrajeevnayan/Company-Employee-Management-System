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
@Table(name = "States")
@Data
public class States {
	@Id
	@SequenceGenerator(name = "gen3", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen3")
	private Long id;

	@Column(nullable = false, name = "countryName")
	private String countryName;
	
	@Column(nullable = false, name = "stateName")
	private String stateName;
}
