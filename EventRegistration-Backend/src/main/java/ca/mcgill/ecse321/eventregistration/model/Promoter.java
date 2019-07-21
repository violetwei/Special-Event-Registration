package ca.mcgill.ecse321.eventregistration.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Promoter extends Person{
	
    
    private List<Event> event = new ArrayList<Event>();
    
    public void setPromotes(List<Event> events) {
    	this.event = events;
    }
    
    @OneToMany
    public List<Event> getPromotes() {
    	return this.event;
    }

}
