package ca.mcgill.ecse321.eventregistration.model;

import javax.persistence.Entity;


@Entity
public class Theatre extends Event{

    
    private String title;
    
    public void setTitle(String value) {
        this.title = value;
    }
    
    public String getTitle() {
        return this.title;
    }

}
