package com.wisenet.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String name;
    private String education;
    private LocalDate dateOfBirth;
    private String photoUrl;
    private String gender;
}
