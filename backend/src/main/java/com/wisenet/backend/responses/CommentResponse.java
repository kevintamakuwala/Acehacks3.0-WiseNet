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
public class CommentResponse {

    private Long commentId;

    private Long userId;
    private String name;
    private Long solutionId;

    private String content;
    private LocalDateTime date;
    private String userPhoto;

    private List<CommentResponse> subComments = new ArrayList<>();
}
