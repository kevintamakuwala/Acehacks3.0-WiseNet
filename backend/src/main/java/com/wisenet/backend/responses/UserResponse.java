package com.wisenet.backend.responses;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.wisenet.backend.enums.GenderEnum;
import com.wisenet.backend.enums.RoleEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserResponse {

    private Long id;
    private String email;

    @Enumerated(EnumType.STRING)
    private RoleEnum roleType;
    private String name;

    @Enumerated(EnumType.STRING)
    private GenderEnum genderEnum;

    private LocalDate dateOfBirth;
    private String photoUrl;
    private String education;
    private List<String> userTags=new ArrayList<>();
}
