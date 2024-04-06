package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.entities.ChallengeLike;
import com.wisenet.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {

    public ChallengeLike findByChallengeAndUser(Challenge challenge, User user);
}
