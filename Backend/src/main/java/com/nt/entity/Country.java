package com.nt.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "country")
@Data
public class Country {
	@Id
	@SequenceGenerator(name = "gen2", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen2")
	private Long id;

	@Column(nullable = false, name = "countryName")
	private String countryName;
	
	//for MYSQL
	@Lob
	@Column(name = "Photo", columnDefinition = "LONGBLOB")
	private byte[] photoCandidate;
	
	
}
