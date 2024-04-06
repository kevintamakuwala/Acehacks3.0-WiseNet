package com.wisenet.backend.requests;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class ChallengeRequest {

    private String title;
    private String description;
    private String author;
    private String imageUrl;

    private List<String> challengeTags = new ArrayList<>();
}
