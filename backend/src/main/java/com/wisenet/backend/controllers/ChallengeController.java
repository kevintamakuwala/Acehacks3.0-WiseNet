package com.wisenet.backend.controllers;

import com.wisenet.backend.entities.Challenge;
import com.wisenet.backend.requests.ChallengeRequest;
import com.wisenet.backend.responses.ChallengeResponse;
import com.wisenet.backend.responses.LikeResponse;
import com.wisenet.backend.services.ChallengeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @PostMapping
    ResponseEntity<?> addChallenge(@RequestBody ChallengeRequest challengeRequest) {
        try {
            Challenge challenge = challengeService.addChallenge(challengeRequest);

            return new ResponseEntity<Long>(challenge.getChallengeId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{challengeId}")
    ResponseEntity<?> getChallenge(@PathVariable("challengeId") Long challengeId) {
        try {
            ChallengeResponse challengeResponse = challengeService.getChallenge(challengeId);

            return new ResponseEntity<ChallengeResponse>(challengeResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/like/{challengeId}")
    ResponseEntity<?> addLike(@PathVariable("challengeId") Long challengeId) {
        try {
            LikeResponse likeResponse = challengeService.addLike(challengeId);

            return new ResponseEntity<LikeResponse>(likeResponse, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unlike/{challengeId}")
    ResponseEntity<?> removeLike(@PathVariable("challengeId") Long challengeId) {
        try {
            LikeResponse likeResponse = challengeService.removeLike(challengeId);

            return new ResponseEntity<LikeResponse>(likeResponse, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllChallenges() {
        try {
            List<ChallengeResponse> challenges = challengeService.getAllChallenges();
            return new ResponseEntity<List<ChallengeResponse>>(challenges, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/filters/{tags}")
    public ResponseEntity<?> getFilteredChallengesFromTags(@PathVariable("tags") String tag) {
        try {
            List<ChallengeResponse> challenges = challengeService.getFilteredChallengesFromTag(tag);
            return new ResponseEntity<List<ChallengeResponse>>(challenges, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
