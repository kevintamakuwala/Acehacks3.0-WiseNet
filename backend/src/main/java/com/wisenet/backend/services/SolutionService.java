package com.wisenet.backend.services;

import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.requests.SolutionRequest;
import com.wisenet.backend.responses.LikeResponse;
import com.wisenet.backend.responses.SolutionCardPage;
import com.wisenet.backend.responses.SolutionResponse;

public interface SolutionService {

    public Solution addSolution(SolutionRequest solutionRequest, Long userId,  Long challengeId);

    public SolutionCardPage getSolutionCardPage(Long challengeId, Integer pageNumber, Integer pageSize);

    public SolutionResponse getSolution(Long solutionId);

    public LikeResponse addLike(Long solutionId);

    public LikeResponse removeLike(Long solutionId);
}
