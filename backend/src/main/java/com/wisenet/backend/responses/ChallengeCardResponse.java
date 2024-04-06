package com.wisenet.backend.responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeCardResponse {

    private Long challengeId;
    private String challengeTitle;
    private Long solutionCount=0l;
    private Long certifiedSolutionCount=0l;
    private List<String> tags = new ArrayList<>();
    private Long likeCount=0l;
    private String urlLink;
    private boolean isLiked;

}
