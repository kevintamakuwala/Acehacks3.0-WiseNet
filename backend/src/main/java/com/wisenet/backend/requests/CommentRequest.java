package com.wisenet.backend.requests;

import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@RequiredArgsConstructor
public class CommentRequest {
    private String content;
}
