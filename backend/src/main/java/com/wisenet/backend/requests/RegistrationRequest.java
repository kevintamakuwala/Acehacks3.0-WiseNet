package com.wisenet.backend.requests;

import java.util.List;

import com.wisenet.backend.enums.GenderEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Mandatory fields.
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

    private String email;
    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    private List<String> tags;
}
