package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.entities.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolutionRepository extends JpaRepository<Solution, Long> {

    Page<Solution> findByChallengeOrderByPostedAtDesc(Challenge challenge, Pageable pageable);
}
