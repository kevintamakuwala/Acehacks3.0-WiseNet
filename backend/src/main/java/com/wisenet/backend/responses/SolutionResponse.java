package com.wisenet.backend.responses;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolutionResponse {
    private Long solutionId;

    private Long userId;
    private String username;

    private Long challengeId;
    private String challengeTitle;

    // This is a list of tags associated with the Solution's challenge
    private List<TagResponse> tags;

    private String solutionTitle;
    private LocalDateTime postedAt;

    private String description1;
    private String description2;
    private String description3;

    private String pdfLink;

    // This is a boolean value that indicates whether the solution has been liked by the user
    private boolean isLiked;
    private Long likesCount = 0l;

    private Long commentsCount = 0l;

    // This is a list of comments associated with the solution
    private List<CommentResponse> comments = new ArrayList<>();

    private String certificateLink;
    private String photoUrl;

}
