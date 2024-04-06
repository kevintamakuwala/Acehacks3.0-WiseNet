package com.wisenet.backend.services.implementations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wisenet.backend.entities.Role;
import com.wisenet.backend.entities.Tag;
import com.wisenet.backend.entities.User;
import com.wisenet.backend.entities.UserTag;
import com.wisenet.backend.enums.RoleEnum;
import com.wisenet.backend.repositories.RoleRepository;
import com.wisenet.backend.repositories.TagRepository;
import com.wisenet.backend.repositories.UserRepository;
import com.wisenet.backend.repositories.UserTagRepository;
import com.wisenet.backend.requests.LoginRequest;
import com.wisenet.backend.requests.RegistrationRequest;
import com.wisenet.backend.services.AuthenticationService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserTagRepository userTagRepository;

    @Override
    public User signup(RegistrationRequest input, RoleEnum roleEnum) {

        Optional<Role> optionalRole = roleRepository.findByRoleType(roleEnum);

        if (optionalRole.isEmpty()) {
            return null;
        }

        User user = new User();
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setRole(optionalRole.get());
        user.setName(input.getName());
        user.setGender(input.getGender());

        user = userRepository.save(user);
        
        List<UserTag> tags = new ArrayList<>();
        for (String tag : input.getTags()) {
            Optional<Tag> t = tagRepository.findByName(tag);
            if (t.isPresent()) {
                UserTag userTag = new UserTag();
                userTag.setTag(t.get());
                userTag.setUser(user);
                tags.add(userTagRepository.save(userTag));
            }
        }
        user.setUserTags(tags);
        return userRepository.save(user);
    }

    @Override
    public User authenticate(LoginRequest input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
            return userRepository.findByEmail(input.getEmail()).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
