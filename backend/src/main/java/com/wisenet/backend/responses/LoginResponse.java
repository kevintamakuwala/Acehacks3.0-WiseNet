package com.wisenet.backend.responses;

import com.wisenet.backend.enums.RoleEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class LoginResponse {

    private String jwt;
    private long expiresIn;
    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;
}
