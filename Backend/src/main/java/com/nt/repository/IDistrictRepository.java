package com.nt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nt.entity.District;

public interface IDistrictRepository extends JpaRepository<District, Long> {

}
