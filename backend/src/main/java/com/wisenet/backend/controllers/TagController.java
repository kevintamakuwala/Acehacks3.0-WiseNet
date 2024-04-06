package com.wisenet.backend.controllers;

import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.requests.SolutionRequest;
import com.wisenet.backend.responses.TagResponse;
import com.wisenet.backend.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    private TagService tagService;


    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<?> addTags(@RequestBody List<String> tags) {
        try {
            List<TagResponse> tagResponseList = tagService.addTags(tags);
            return new ResponseEntity<List<TagResponse>>(tagResponseList, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("")
    ResponseEntity<?> getTags()
    {
        try {
            List<TagResponse> tagResponseList = tagService.getTags();
            return new ResponseEntity<List<TagResponse>>(tagResponseList, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
