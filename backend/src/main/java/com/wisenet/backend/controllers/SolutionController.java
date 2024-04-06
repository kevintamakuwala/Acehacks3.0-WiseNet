package com.wisenet.backend.controllers;

import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.entities.SolutionLike;
import com.wisenet.backend.requests.SolutionRequest;
import com.wisenet.backend.responses.LikeResponse;
import com.wisenet.backend.responses.SolutionCardPage;
import com.wisenet.backend.responses.SolutionResponse;
import com.wisenet.backend.services.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/solutions")
public class SolutionController {
    @Autowired
    private SolutionService solutionService;

    @PostMapping("/{userId}/{challengeId}")
    ResponseEntity<?> addSolution(@RequestBody SolutionRequest solutionRequest,
            @PathVariable("userId") Long userId,
            @PathVariable("challengeId") Long challengeId) {
        try {
            Solution solution = solutionService.addSolution(solutionRequest, userId, challengeId);

            return new ResponseEntity<Long>(solution.getSolutionId(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{challengeId}/{pageNumber}/{pageSize}")
    ResponseEntity<?> getSolutions(@PathVariable("challengeId") Long challengeId,
            @PathVariable("pageNumber") Integer pageNumber,
            @PathVariable("pageSize") Integer pageSize) {
        try {
            SolutionCardPage solutionCardPage = solutionService.getSolutionCardPage(challengeId, pageNumber, pageSize);

            return new ResponseEntity<SolutionCardPage>(solutionCardPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{solutionId}")
    ResponseEntity<?> getSolution(@PathVariable("solutionId") Long solutionId) {
        try {
            SolutionResponse solutionResponse = solutionService.getSolution(solutionId);
            return new ResponseEntity<SolutionResponse>(solutionResponse, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/like/{solutionId}")
    ResponseEntity<?> addLike(@PathVariable("solutionId") Long solutionId)
    {
        try{
            LikeResponse likeResponse = solutionService.addLike(solutionId);

            return new ResponseEntity<LikeResponse>(likeResponse, HttpStatus.OK);

        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unlike/{solutionId}")
    ResponseEntity<?> removeLike(@PathVariable("solutionId") Long solutionId)
    {
        try{
            LikeResponse likeResponse = solutionService.removeLike(solutionId);

            return new ResponseEntity<LikeResponse>(likeResponse, HttpStatus.OK);

        }
        catch(Exception e)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
