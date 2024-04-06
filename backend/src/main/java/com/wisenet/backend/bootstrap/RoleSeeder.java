
package com.wisenet.backend.bootstrap;

import com.wisenet.backend.entities.Role;
import com.wisenet.backend.enums.RoleEnum;
import com.wisenet.backend.repositories.RoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {
    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(@SuppressWarnings("null") ContextRefreshedEvent contextRefreshedEvent) {
        this.loadRoles();
    }

    private void loadRoles() {
        RoleEnum[] roleNames = new RoleEnum[] { RoleEnum.ADMIN, RoleEnum.USER };

        Arrays.stream(roleNames).forEach(roleName -> {
            Optional<Role> optionalRole = roleRepository.findByRoleType(roleName);

            if (optionalRole.isEmpty()) {
                Role roleToCreate = new Role();

                roleToCreate.setRoleType(roleName);

                roleRepository.save(roleToCreate);
            }
        });

    }
}