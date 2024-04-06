package com.wisenet.backend.requests;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
public class SolutionRequest {

    private LocalDateTime postedAt;
    private String title;

    private String description1, description2, description3;

    private String pdfLink;

}
