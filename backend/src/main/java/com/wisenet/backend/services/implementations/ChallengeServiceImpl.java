package com.wisenet.backend.services.implementations;

import com.wisenet.backend.entities.*;
import com.wisenet.backend.repositories.*;
import com.wisenet.backend.requests.ChallengeRequest;
import com.wisenet.backend.responses.ChallengeCardResponse;
import com.wisenet.backend.responses.ChallengeResponse;
import com.wisenet.backend.responses.LikeResponse;
import com.wisenet.backend.services.ChallengeService;

import jakarta.transaction.Transactional;
import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChallengeServiceImpl implements ChallengeService {

    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private UserTagRepository userTagRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private ChallengeTagRepository challengeTagRepository;
    @Autowired
    private ChallengeLikeRepository challengeLikeRepository;

    private final Object lock = new Object();

    @SuppressWarnings("null")
    @Override
    public Challenge addChallenge(ChallengeRequest challengeRequest) {
        return challengeRepository.save(challengeRequestToChallenge(challengeRequest));

    }

    @Override
    public ChallengeResponse getChallenge(@NonNull Long id) {
        Challenge challenge = challengeRepository.findById(id).orElseThrow();

        return getChallengeResponse(challenge);

    }

    @Override
    public LikeResponse addLike(@NonNull Long challengeId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();
        synchronized (lock) {

            ChallengeLike challengeLike = challengeLikeRepository.findByChallengeAndUser(challenge, currentUser);
            if (challengeLike != null) {
                return new LikeResponse(challenge.getLikesCount(), challengeId);
            }

            ChallengeLike challengeLike1 = new ChallengeLike();
            challengeLike1.setChallenge(challenge);
            challengeLike1.setUser(currentUser);

            challengeLikeRepository.save(challengeLike1);

            challenge.setLikesCount((challenge.getLikesCount() == null ? 0 : challenge.getLikesCount()) + 1);

            challengeRepository.save(challenge);
        }

        LikeResponse likeResponse = new LikeResponse();

        likeResponse.setId(challengeId);
        likeResponse.setTotalLike(challenge.getLikesCount());

        return likeResponse;
    }

    @Override
    public LikeResponse removeLike(@NonNull Long challengeId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();
        synchronized (lock) {

            ChallengeLike challengeLike = challengeLikeRepository.findByChallengeAndUser(challenge, currentUser);
            if (challengeLike == null) {
                return new LikeResponse(challenge.getLikesCount(), challengeId);
            }

            challengeLikeRepository.delete(challengeLike);

            challenge.setLikesCount((challenge.getLikesCount() == null ? 0 : challenge.getLikesCount()) - 1);

            challengeRepository.save(challenge);
        }

        LikeResponse likeResponse = new LikeResponse();

        likeResponse.setId(challengeId);
        likeResponse.setTotalLike(challenge.getLikesCount());

        return likeResponse;
    }

    private ChallengeResponse getChallengeResponse(Challenge challenge) {
        ChallengeResponse challengeResponse = new ChallengeResponse();

        challengeResponse.setTitle(challenge.getTitle());
        challengeResponse.setDescription(challenge.getDescription());
        challengeResponse.setPostedAt(challenge.getPostedAt());
        challengeResponse.setLikesCount(challenge.getLikesCount());
        challengeResponse.setImageUrl(challenge.getImageUrl());
        challengeResponse.setChallengeId(challenge.getChallengeId());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        ChallengeLike challengeLike = challengeLikeRepository.findByChallengeAndUser(challenge, currentUser);

        if (challengeLike == null) {
            challengeResponse.setLiked(false);
        } else {
            challengeResponse.setLiked(true);
        }

        return challengeResponse;
    }

    private ChallengeCardResponse mapChallengeToChallengeCardResponse(Challenge challenge) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        ChallengeCardResponse challengeCardResponse = new ChallengeCardResponse();

        challengeCardResponse.setChallengeId(challenge.getChallengeId());
        challengeCardResponse.setChallengeTitle(challenge.getTitle());
        challengeCardResponse.setLikeCount(challenge.getLikesCount());
        challengeCardResponse.setUrlLink(challenge.getImageUrl());
        challengeCardResponse.setSolutionCount(challenge.getSolutions().stream().count());
        challengeCardResponse.setTags(challenge.getChallengeTags().stream().map(user -> {
            return user.getTag().getName();
        }).collect(Collectors.toList()));

        challengeCardResponse.setCertifiedSolutionCount(challenge.getSolutions().stream().filter(user -> {
            if (user.getCertificateLink() != null && !user.getCertificateLink().equals("")) {
                return true;
            }
            return false;
        }).count());

        challengeCardResponse.setLiked(challengeLikeRepository.findByChallengeAndUser(challenge, currentUser) != null);

        return challengeCardResponse;
    }

    private Challenge challengeRequestToChallenge(ChallengeRequest challengeRequest) {
        Challenge challenge = new Challenge();

        challenge.setAuthor(challengeRequest.getAuthor());
        challenge.setDescription(challengeRequest.getDescription());
        challenge.setTitle(challengeRequest.getTitle());
        challenge.setPostedAt(LocalDateTime.now());
        challenge.setImageUrl(challengeRequest.getImageUrl());

        challenge.setLikesCount(0l);

        Challenge c = challengeRepository.save(challenge);

        tagList(challengeRequest.getChallengeTags(), c);
        return c;
    }

    private void tagList(List<String> tags, Challenge challenge) {

        for (String tag : tags) {
            Optional<Tag> t = tagRepository.findByName(tag);
            if (t.isPresent()) {
                ChallengeTag challengeTag = new ChallengeTag();
                challengeTag.setChallenge(challenge);
                challengeTag.setTag(t.get());
                challengeTagRepository.save(challengeTag);
            } else {
                Tag tag1 = new Tag();
                tag1.setName(tag);
                tag1 = tagRepository.save(tag1);
                ChallengeTag challengeTag = new ChallengeTag();
                challengeTag.setChallenge(challenge);
                challengeTag.setTag(tag1);
                challengeTagRepository.save(challengeTag);
            }
        }
    }

    @Override
    public List<ChallengeResponse> getAllChallenges() {
        List<Challenge> challenges = challengeRepository.findAll();
        List<ChallengeResponse> challengeResponses = new ArrayList<>();
        for (Challenge challenge : challenges) {
            challengeResponses.add(getChallengeResponse(challenge));
        }
        return challengeResponses;
    }

    @Override
    public List<ChallengeResponse> getFilteredChallengesFromTag(String tag) {
        List<ChallengeTag> challengeTags = challengeTagRepository.findByTag(tag);
        List<ChallengeResponse> challengeResponses = new ArrayList<>();
        for (ChallengeTag challengeTag : challengeTags) {
            challengeResponses.add(getChallengeResponse(challengeTag.getChallenge()));
        }
        return challengeResponses;
    }
}
