package com.wisenet.backend.services;

import com.wisenet.backend.requests.UserRequest;
import com.wisenet.backend.responses.UserProfileResponse;
import com.wisenet.backend.responses.UserResponse;

public interface UserService {

    public UserResponse updateUserprofile(UserRequest userRequest);

    public UserProfileResponse getUserProfile();
}
