package com.wisenet.backend.responses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class ChallengeResponse {

    private Long challengeId;

    private String title;
    private String description;
    private Long likesCount=0l;
    private String imageUrl;
    private LocalDateTime postedAt;
    private boolean isLiked=false;
}
