package com.wisenet.backend.repositories;

import com.wisenet.backend.entities.ChallengeTag;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChallengeTagRepository extends JpaRepository<ChallengeTag, Long> {

    @Query("SELECT c FROM ChallengeTag c WHERE c.tag.name = :tagName")
    public List<ChallengeTag> findByTag(@Param("tagName") String tagName);

}