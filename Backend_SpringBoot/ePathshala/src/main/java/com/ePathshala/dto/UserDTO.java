package com.ePathshala.dto;

import com.ePathshala.enums.Role;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String name;
    private String email;
    private String accountNumber;
    private Role role;
}