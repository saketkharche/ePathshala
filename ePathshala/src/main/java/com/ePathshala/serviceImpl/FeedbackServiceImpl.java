package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.FeedbackDTO;
import com.ePathshala.repository.FeedbackRepository;
import com.ePathshala.service.FeedbackService;

@Service
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackRepository feedbackRepository;

	public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}

	@Override
	public FeedbackDTO submitFeedback(FeedbackDTO dto) {
		return null;
	}

	@Override
	public List<FeedbackDTO> getFeedbacksByEmail(String email) {
		return null;
	}
}