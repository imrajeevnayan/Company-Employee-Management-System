package com.nt.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Customer")
@Data
public class Customer {

    @Id
    @SequenceGenerator(name = "gen5", sequenceName = "customer_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gen5")
    private Long id;

    @Column(nullable = false)
    private String custName;

    @Column(nullable = false)
    private String custEmail;

    @Column(nullable = false)
    private String custMob;

    @Lob
    private byte[] photoxxx;
}
