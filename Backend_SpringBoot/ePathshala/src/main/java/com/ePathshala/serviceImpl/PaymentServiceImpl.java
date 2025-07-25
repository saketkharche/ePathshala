package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.PaymentDTO;
import com.ePathshala.repository.PaymentRepository;
import com.ePathshala.service.PaymentService;

@Service
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;

	public PaymentServiceImpl(PaymentRepository paymentRepository) {
		this.paymentRepository = paymentRepository;
	}

	@Override
	public PaymentDTO recordPayment(PaymentDTO dto) {
		return null;
	}

	@Override
	public List<PaymentDTO> getPaymentsByStudentId(Integer studentId) {
		return null;
	}
}