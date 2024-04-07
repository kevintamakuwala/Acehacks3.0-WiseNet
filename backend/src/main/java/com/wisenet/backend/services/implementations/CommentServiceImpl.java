package com.wisenet.backend.services.implementations;

import com.wisenet.backend.entities.Comment;
import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.entities.User;
import com.wisenet.backend.repositories.CommentRepository;
import com.wisenet.backend.repositories.SolutionRepository;
import com.wisenet.backend.repositories.UserRepository;
import com.wisenet.backend.requests.CommentRequest;
import com.wisenet.backend.responses.CommentResponse;
import com.wisenet.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SolutionRepository solutionRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public CommentResponse addComment(CommentRequest commentRequest, Long userId, Long solutionId, Long commentId) {
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setPostedAt(LocalDateTime.now());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Solution solution = solutionRepository.findById(solutionId)
                .orElseThrow(() -> new RuntimeException("Solution not found"));

        comment.setUser(currentUser);
        comment.setSolution(solution);

        if (commentId != -1) {
            Comment parentComment = commentRepository.findById(commentId)
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }

        return mapCommentToCommentResponse(commentRepository.save(comment));
    }

    private CommentResponse mapCommentToCommentResponse(Comment comment) {
        CommentResponse commentResponse = new CommentResponse();

        commentResponse.setCommentId(comment.getCommentId());
        commentResponse.setDate(comment.getPostedAt());
        commentResponse.setContent(comment.getContent());

        User user = comment.getUser();
        Solution solution = comment.getSolution();

        if (user != null && solution != null) {
            commentResponse.setUserId(user.getUserId());
            commentResponse.setName(user.getName());
            commentResponse.setSolutionId(solution.getSolutionId());
        } else {
            throw new RuntimeException("User or Solution not present");
        }

        commentResponse.setSubComments(
                comment.getSubordinates().stream().map(this::mapCommentToCommentResponse).collect(Collectors.toList()));

        return commentResponse;
    }
}
