package com.wisenet.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserProfileResponse {
    UserResponse user;
    List<SolutionCard> solutionCardList;
}
