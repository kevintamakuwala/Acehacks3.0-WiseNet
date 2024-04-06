package com.wisenet.backend.responses;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@RequiredArgsConstructor
public class SolutionCardPage {

    List<SolutionCard> solutions = new ArrayList<>();
    private Integer pageNumber, pageSize, totalPages;
    private Long totalElements;

    Boolean isLast;
}
