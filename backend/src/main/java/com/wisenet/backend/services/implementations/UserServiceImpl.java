package com.wisenet.backend.services.implementations;

import com.wisenet.backend.entities.Solution;
import com.wisenet.backend.entities.User;
import com.wisenet.backend.entities.UserTag;
import com.wisenet.backend.enums.GenderEnum;
import com.wisenet.backend.repositories.UserRepository;
import com.wisenet.backend.requests.UserRequest;
import com.wisenet.backend.responses.SolutionCard;
import com.wisenet.backend.responses.UserProfileResponse;
import com.wisenet.backend.responses.UserResponse;
import com.wisenet.backend.services.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserResponse updateUserprofile(UserRequest userRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        if (userRequest.getName() != null)
            currentUser.setName(userRequest.getName());
        if (userRequest.getEducation() != null)
            currentUser.setEducation(userRequest.getEducation());
        if (userRequest.getGender() != null)
            currentUser.setGender(GenderEnum.valueOf(userRequest.getGender()));
        if (userRequest.getDateOfBirth() != null)
            currentUser.setDateOfBirth(userRequest.getDateOfBirth());
        if (userRequest.getPhotoUrl() != null)
            currentUser.setPhotoUrl(userRequest.getPhotoUrl());

        User user = userRepository.save(currentUser);

        return getUserResponse(user);
    }

    @Override
    public UserProfileResponse getUserProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        System.out.println(currentUser.getName()+" %%%%%%%%%%%%%%%");

        UserProfileResponse userProfileResponse = new UserProfileResponse();
        System.out.println(currentUser.getName()+" %%%%%%%%%%%%%%%  1");
        UserResponse userResponse = getUserResponse(currentUser);
        System.out.println(currentUser.getName()+" %%%%%%%%%%%%%%%   2");

        List<SolutionCard> solutionCardList = new ArrayList<>();

        for(Solution solution:currentUser.getSolutions())
        {
            SolutionCard solutionCard = new SolutionCard();

            solutionCard.setSolutionId(solution.getSolutionId());
            solutionCard.setTitle(solution.getTitle());
            solutionCard.setPostedAt(solution.getPostedAt());
            solutionCard.setLikesCount(solution.getLikesCount());
            solutionCard.setCertificateLink(solution.getCertificateLink());
            solutionCard.setCommentsCount(solution.getComments().stream().count());
            solutionCard.setChallengeId(solution.getSolutionId());
            solutionCard.setChallengeTitle(solution.getChallenge().getTitle());
            solutionCard.setPhotoLink(solution.getUser().getPhotoUrl());

            solutionCardList.add(solutionCard);
        }

        userProfileResponse.setUser(userResponse);
        userProfileResponse.setSolutionCardList(solutionCardList);
        System.out.println("done");
        return userProfileResponse;
    }

    private static UserResponse getUserResponse(User user) {
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   2");
        UserResponse userResponse = new UserResponse();
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   3");
        userResponse.setId(user.getUserId());
        userResponse.setEducation(user.getEducation());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   4");
        userResponse.setPhotoUrl(user.getPhotoUrl());
        userResponse.setEmail(user.getEmail());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   5");
        userResponse.setGenderEnum(user.getGender());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   6");
        userResponse.setDateOfBirth(user.getDateOfBirth());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   7");
        userResponse.setRoleType(user.getRole().getRoleType());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   8");
        userResponse.setName(user.getName());
        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   9");



        List<String> userTag = new ArrayList<>();

        List<UserTag> userTags= user.getUserTags();

        if(!userTags.isEmpty())
        {
            System.out.println(user.getName()+" %%%%%%%%%%%%%%%   10");
            System.out.println(userTag.isEmpty());
            for (UserTag tag : userTags) {
                System.out.println("done");
                userTag.add(tag.getTag().getName());
                System.out.println("ok");

            }
            System.out.println(user.getName()+" %%%%%%%%%%%%%%%   11");
        }

        System.out.println(user.getName()+" %%%%%%%%%%%%%%%   2");
        userResponse.setUserTags(userTag);
        return userResponse;
    }
}
