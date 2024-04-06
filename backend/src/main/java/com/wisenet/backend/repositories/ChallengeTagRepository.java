package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.entities.ChallengeTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTagRepository extends JpaRepository<ChallengeTag, Long> {
}
