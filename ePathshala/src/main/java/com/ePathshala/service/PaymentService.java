package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.PaymentDTO;

public interface PaymentService {
	PaymentDTO recordPayment(PaymentDTO dto);

	List<PaymentDTO> getPaymentsByStudentId(Integer studentId);
}