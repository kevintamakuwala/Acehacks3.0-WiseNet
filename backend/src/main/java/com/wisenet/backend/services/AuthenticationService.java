package com.wisenet.backend.services;

import com.wisenet.backend.entities.User;
import com.wisenet.backend.enums.RoleEnum;
import com.wisenet.backend.requests.LoginRequest;
import com.wisenet.backend.requests.RegistrationRequest;

public interface AuthenticationService {
    
    public User signup(RegistrationRequest input, RoleEnum roleEnum);

    public User authenticate(LoginRequest input);
}
