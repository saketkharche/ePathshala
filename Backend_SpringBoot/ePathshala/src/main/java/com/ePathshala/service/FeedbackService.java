package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.FeedbackDTO;

public interface FeedbackService {
	FeedbackDTO submitFeedback(FeedbackDTO dto);

	List<FeedbackDTO> getFeedbacksByEmail(String email);
}