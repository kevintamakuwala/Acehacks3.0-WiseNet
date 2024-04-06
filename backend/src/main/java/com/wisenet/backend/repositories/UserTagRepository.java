package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTagRepository extends JpaRepository<UserTag, Long> {
}
