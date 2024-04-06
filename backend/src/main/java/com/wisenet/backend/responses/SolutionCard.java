package com.wisenet.backend.responses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class SolutionCard {

    private Long solutionId;
    private LocalDateTime postedAt;
    private String title;
    private Long challengeId;
    private String challengeTitle;
    private String photoLink;

    private Long likesCount = 0l;
    private String certificateLink = null;
    private Long commentsCount = 0l;
}
