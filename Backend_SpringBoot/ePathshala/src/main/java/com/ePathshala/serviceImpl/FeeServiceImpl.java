package com.ePathshala.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.FeeDTO;
import com.ePathshala.repository.FeeRepository;
import com.ePathshala.service.FeeService;

@Service
public class FeeServiceImpl implements FeeService {

	private final FeeRepository feeRepository;

	public FeeServiceImpl(FeeRepository feeRepository) {
		this.feeRepository = feeRepository;
	}

	@Override
	public FeeDTO createFee(FeeDTO dto) {
		return null;
	}

	@Override
	public List<FeeDTO> getFeesByClassId(Integer classId) {
		return null;
	}
}