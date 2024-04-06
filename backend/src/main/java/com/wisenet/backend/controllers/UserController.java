package com.wisenet.backend.controllers;

import com.wisenet.backend.requests.UserRequest;
import com.wisenet.backend.responses.UserProfileResponse;
import com.wisenet.backend.responses.UserResponse;
import com.wisenet.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PatchMapping
    public ResponseEntity<?> updateUserprofile(@RequestBody UserRequest userRequest) {
        try {
            UserResponse userResponse = userService.updateUserprofile(userRequest);

            return new ResponseEntity<UserResponse>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("")
    public ResponseEntity<?> getUserProfile()
    {
        try{
            return new ResponseEntity<UserProfileResponse>(userService.getUserProfile(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
