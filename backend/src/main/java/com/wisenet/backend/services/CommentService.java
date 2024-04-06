package com.wisenet.backend.services;

import com.wisenet.backend.requests.CommentRequest;
import com.wisenet.backend.responses.CommentResponse;



public interface CommentService {
    public CommentResponse addComment(CommentRequest commentRequest, Long userId, Long solutionId, Long commentId);
}
