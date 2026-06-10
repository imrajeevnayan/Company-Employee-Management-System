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
import jakarta.persistence.ElementCollection;

@Entity
@Table(name = "EmployeeDDL")
@Data
public class EmployeeDDL {
    @Id
    @SequenceGenerator(name = "gen7", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen7")
    private Long id;

    @Column(nullable = false)
    private String empDName;

    @Column(nullable = false)
    private String empDEmail;

    @Column(nullable = false)
    private String empDMob;

    @Column(nullable = false)
    private String empDCountry;

    @Column(nullable = false)
    private String empDState;

    @Column(nullable = false)
    private String empDDistrict;

    @Column(nullable = false)
    private String empDGender;

    @ElementCollection
    private List<String> empDLanguage; // ✅ now Hibernate will handle this
}
