package com.nt.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nt.entity.States;
import com.nt.service.IStateMangementService;

@RestController
@RequestMapping("/states") 
@CrossOrigin(origins = "http://localhost:5173")
public class StateController {

    @Autowired
    private IStateMangementService stateService;

    // Add new state
    @PostMapping("/add")
    public States addState(@RequestBody States s) {
        return stateService.addNewState(s);
    }

    // Get all states
    @GetMapping("/all")
    public List<States> getAllStates() {
        return stateService.showAllCountry();
    }

    // Get state by id
    @GetMapping("/{id}")
    public States getState(@PathVariable Long id) {
        return stateService.getById(id);
    }

    // Update state
    @PutMapping("/update/{id}")
    public States updateState(@PathVariable Long id, @RequestBody States updatedState) {
        States s = stateService.getById(id);
        s.setCountryName(updatedState.getCountryName());
        s.setStateName(updatedState.getStateName());
        return stateService.addNewState(s);
    }

    // Delete state
    @DeleteMapping("/delete/{id}")
    public void deleteState(@PathVariable Long id) {
        stateService.deleteState(id);
    }
    
}
