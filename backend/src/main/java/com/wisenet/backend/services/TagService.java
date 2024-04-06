package com.wisenet.backend.services;

import com.wisenet.backend.responses.TagResponse;

import java.util.List;

public interface TagService {

    List<TagResponse> addTags(List<String> tags);

    List<TagResponse> getTags();
}
