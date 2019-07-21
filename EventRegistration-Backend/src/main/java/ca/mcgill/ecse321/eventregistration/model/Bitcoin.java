package ca.mcgill.ecse321.eventregistration.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Bitcoin {
	
	private int bitcoinID;
	
	public void setBitcoinID(int value) {
		this.bitcoinID = value;
	}
	@Id
	@GeneratedValue
	public int getBitcoinID() {
		return bitcoinID;
 
	}
	
    private int amount;
    
    public void setAmount(int value) {
        this.amount = value;
    }
    
    
    public int getAmount() {
    	return this.amount;
    }
    
    private String userID;
    
    public void setUserID(String value) {
    	this.userID = value;
    }
    
    public String getUserID() {
    	return this.userID;
    }

}
