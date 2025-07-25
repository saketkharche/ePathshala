package com.ePathshala.serviceImpl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ePathshala.dto.ParentDTO;
import com.ePathshala.repository.ParentRepository;
import com.ePathshala.service.ParentService;

@Service
public class ParentServiceImpl implements ParentService {

	private final ParentRepository parentRepository;

	public ParentServiceImpl(ParentRepository parentRepository) {
		this.parentRepository = parentRepository;
	}

	@Override
	public ParentDTO registerParent(ParentDTO dto) {
		return null;
	}

	@Override
	public Optional<ParentDTO> getParentByUserId(Integer userId) {
		return null;
	}
}