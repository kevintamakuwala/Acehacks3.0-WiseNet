package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);
}
