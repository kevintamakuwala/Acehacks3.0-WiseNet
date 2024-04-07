package com.wisenet.backend.services;

import java.util.List;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.requests.ChallengeRequest;
import com.wisenet.backend.responses.ChallengeResponse;
import com.wisenet.backend.responses.LikeResponse;

public interface ChallengeService {

    public Challenge addChallenge(ChallengeRequest challengeRequest);

    public ChallengeResponse getChallenge(Long id);

    public LikeResponse addLike(Long challengeId);

    public LikeResponse removeLike(Long challengeId);

    public List<ChallengeResponse> getAllChallenges();

    public List<ChallengeResponse> getFilteredChallengesFromTag(String tag);
}
