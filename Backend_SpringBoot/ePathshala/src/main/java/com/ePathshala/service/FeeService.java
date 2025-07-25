package com.ePathshala.service;

import java.util.List;

import com.ePathshala.dto.FeeDTO;

public interface FeeService {
	FeeDTO createFee(FeeDTO dto);

	List<FeeDTO> getFeesByClassId(Integer classId);
}