package ca.mcgill.ecse321.eventregistration.dto;

import java.util.Collections;
import java.util.List;

public class PromoterDto {
	
	private String name;
	private List<EventDto> eventsAttended;

	public PromoterDto() {
	}

	@SuppressWarnings("unchecked")
	public PromoterDto(String name) {
		this(name, Collections.EMPTY_LIST);
	}

	public PromoterDto(String name, List<EventDto> events) {
		this.name = name;
		this.eventsAttended = events;
	}

	public String getName() {
		return name;
	}

	public List<EventDto> getEventsAttended() {
		return eventsAttended;
	}

	public void setEventsAttended(List<EventDto> events) {
		this.eventsAttended = events;
	}

}
