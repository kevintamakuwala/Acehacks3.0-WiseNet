package com.wisenet.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.wisenet.backend.entities.User;
import com.wisenet.backend.entities.UserTag;
import com.wisenet.backend.enums.RoleEnum;
import com.wisenet.backend.requests.LoginRequest;
import com.wisenet.backend.requests.RegistrationRequest;
import com.wisenet.backend.responses.LoginResponse;
import com.wisenet.backend.responses.UserResponse;
import com.wisenet.backend.services.AuthenticationService;
import com.wisenet.backend.services.JwtService;

import jakarta.validation.Valid;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/signup/{role}")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegistrationRequest registerUserReq,
            @PathVariable String role) {

        User registeredUser = authenticationService.signup(registerUserReq, RoleEnum.valueOf(role));

        List<String> tags = new ArrayList<>();
        for (UserTag tag : registeredUser.getUserTags()) {
            tags.add(tag.getTag().getName());
        }

        UserResponse userResponse = new UserResponse(
                registeredUser.getUserId(),

                registeredUser.getEmail(),
                registeredUser.getRole().getRoleType(),
                registeredUser.getName(),
                registeredUser.getGender(),
                registeredUser.getDateOfBirth(),
                registeredUser.getPhotoUrl(),
                registeredUser.getEducation(),
                tags);

        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginRequest loginUserReq) {
        User authenticatedUser = authenticationService.authenticate(loginUserReq);

        if (authenticatedUser != null) {
            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime(),
                    authenticatedUser.getRole().getRoleType());

            return ResponseEntity.ok(loginResponse);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
    }

}
