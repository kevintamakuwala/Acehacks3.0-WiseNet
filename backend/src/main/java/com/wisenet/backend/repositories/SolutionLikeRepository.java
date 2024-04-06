package com.wisenet.backend.repositories;


import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wisenet.backend.entities.SolutionLike;

public interface SolutionLikeRepository extends JpaRepository<SolutionLike, Long> {

    public SolutionLike findBySolutionAndUser(Solution solution, User user);
}
