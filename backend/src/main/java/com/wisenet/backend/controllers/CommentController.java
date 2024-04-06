package com.wisenet.backend.controllers;

import com.wisenet.backend.entities.Comment;
import com.wisenet.backend.requests.CommentRequest;
import com.wisenet.backend.responses.CommentResponse;
import com.wisenet.backend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("comments/{userId}/{solutionId}/{commentId}")
    public ResponseEntity<?> addComment(@RequestBody CommentRequest commentRequest,
            @PathVariable("userId") Long userId,
            @PathVariable("commentId") Long commentId,
            @PathVariable("solutionId") Long solutionId) {
        try {
            CommentResponse commentResponse = commentService.addComment(commentRequest, userId, solutionId, commentId);

            return new ResponseEntity<CommentResponse>(commentResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
