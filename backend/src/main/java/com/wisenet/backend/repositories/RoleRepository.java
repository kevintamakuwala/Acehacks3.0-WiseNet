package com.wisenet.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wisenet.backend.entities.Role;
import com.wisenet.backend.enums.RoleEnum;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    public Optional<Role> findByRoleType(RoleEnum roleEnum);
}