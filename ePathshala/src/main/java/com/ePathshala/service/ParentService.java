package com.ePathshala.service;

import java.util.Optional;

import com.ePathshala.dto.ParentDTO;

public interface ParentService {
	ParentDTO registerParent(ParentDTO dto);

	Optional<ParentDTO> getParentByUserId(Integer userId);
}