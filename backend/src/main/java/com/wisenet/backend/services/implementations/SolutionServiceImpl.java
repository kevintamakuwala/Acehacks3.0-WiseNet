package com.wisenet.backend.services.implementations;

import com.wisenet.backend.entities.*;
import com.wisenet.backend.repositories.ChallengeRepository;
import com.wisenet.backend.repositories.SolutionLikeRepository;
import com.wisenet.backend.repositories.SolutionRepository;
import com.wisenet.backend.repositories.UserRepository;
import com.wisenet.backend.requests.SolutionRequest;
import com.wisenet.backend.responses.*;
import com.wisenet.backend.services.SolutionService;

import jakarta.transaction.Transactional;
import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class SolutionServiceImpl implements SolutionService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private SolutionLikeRepository solutionLikeRepository;

    private final Object lock = new Object();

    @Override
    public Solution addSolution(@NonNull SolutionRequest solutionRequest, @NonNull Long userId,
            @NonNull Long challengeId) {
        Solution solution = new Solution();

        solution.setDescription1(solutionRequest.getDescription1());
        solution.setDescription2(solutionRequest.getDescription2());
        solution.setDescription3(solutionRequest.getDescription3());
        solution.setTitle(solutionRequest.getTitle());
        solution.setPostedAt(LocalDateTime.now());
        solution.setPdfLink(solutionRequest.getPdfLink());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

//        User user = userRepository.findById(userId).orElseThrow();
        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();

        solution.setUser(currentUser);
        solution.setChallenge(challenge);
        solution = solutionRepository.save(solution);

        return solution;
    }

    @Override
    public SolutionCardPage getSolutionCardPage(@NonNull Long challengeId, Integer pageNumber, Integer pageSize) {

        Sort sort = Sort.by("postedAt").descending();
        Pageable page = PageRequest.of(pageNumber, pageSize, sort);

        Challenge challenge = challengeRepository.findById(challengeId).orElseThrow();

        Page<Solution> solutions = solutionRepository.findByChallengeOrderByPostedAtDesc(challenge, page);

        SolutionCardPage solutionCardPage = new SolutionCardPage();
        List<SolutionCard> solutionList = new ArrayList<>();

        for (Solution solution : solutions) {

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

            solutionList.add(solutionCard);
        }

        solutionCardPage.setSolutions(solutionList);

        solutionCardPage.setPageNumber(solutions.getNumber());
        solutionCardPage.setPageSize(solutions.getSize());
        solutionCardPage.setTotalPages(solutions.getTotalPages());
        solutionCardPage.setTotalElements(solutions.getTotalElements());
        solutionCardPage.setIsLast(solutions.isLast());
        return solutionCardPage;
    }

    @Override
    public SolutionResponse getSolution(@NonNull Long solutionId) {
        // getting user Object from the security context.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        boolean isLiked = false;

        // check if the currentUser has liked the solution
        Solution solution = solutionRepository.findById(solutionId).orElseThrow();
        if (solution.getSolutionLikes().stream().anyMatch(user -> user.getUser().getUserId().equals(currentUser.getUserId()))) {
            isLiked = true;
        }

        SolutionResponse solutionResponse = mapSolutionToSolutionResponse(solution);
        solutionResponse.setLiked(isLiked);
        return solutionResponse;
    }

    @Override
    public LikeResponse addLike(@NonNull Long solutionId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Solution solution = solutionRepository.findById(solutionId).orElseThrow();
        synchronized (lock) {
            SolutionLike solutionLike1 = solutionLikeRepository.findBySolutionAndUser(solution, currentUser);

            if(solutionLike1 != null)
            {
                return new LikeResponse(solution.getLikesCount(), solutionId);
            }

            SolutionLike solutionLike=new SolutionLike();

            solutionLike.setSolution(solution);
            solutionLike.setUser(currentUser);

            solutionLikeRepository.save(solutionLike);


            solution.setLikesCount((solution.getLikesCount() == null ? 0: solution.getLikesCount())+1);

            solutionRepository.save(solution);
        }

        LikeResponse likeResponse = new LikeResponse();

        likeResponse.setId(solutionId);
        likeResponse.setTotalLike(solution.getLikesCount());

        return likeResponse;
    }

    @Override
    public LikeResponse removeLike(@NonNull Long solutionId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        Solution solution = solutionRepository.findById(solutionId).orElseThrow();
        synchronized (lock) {
            SolutionLike solutionLike1 = solutionLikeRepository.findBySolutionAndUser(solution, currentUser);

            if(solutionLike1 == null)
            {
                return new LikeResponse(solution.getLikesCount(), solutionId);
            }

            solutionLikeRepository.delete(solutionLike1);


            solution.setLikesCount(solution.getLikesCount()-1);

            solutionRepository.save(solution);
        }

        LikeResponse likeResponse = new LikeResponse();

        likeResponse.setId(solutionId);
        likeResponse.setTotalLike(solution.getLikesCount());

        return likeResponse;
    }

    private SolutionResponse mapSolutionToSolutionResponse(Solution solution) {
        SolutionResponse solutionResponse = new SolutionResponse();

        solutionResponse.setSolutionId(solution.getSolutionId());
        solutionResponse.setSolutionTitle(solution.getTitle());

        solutionResponse.setDescription1(solution.getDescription1());
        solutionResponse.setDescription2(solution.getDescription2());
        solutionResponse.setDescription3(solution.getDescription3());

        solutionResponse.setPdfLink(solution.getPdfLink());
        solutionResponse.setPostedAt(solution.getPostedAt());

        User user = solution.getUser();
        Challenge challenge = solution.getChallenge();

     
        if (user != null && challenge != null) {
            solutionResponse.setUserId(user.getUserId());
            solutionResponse.setUsername(user.getName());
            solutionResponse.setChallengeId(challenge.getChallengeId());
            solutionResponse.setChallengeTitle(challenge.getTitle());
        } else {
            throw new RuntimeException("User or Challenge not present");
        }

        solutionResponse.setLikesCount(solution.getLikesCount());
        solutionResponse.setCommentsCount(solution.getComments().stream().count());
        solutionResponse.setCertificateLink(solution.getCertificateLink() == null ? "" : solution.getCertificateLink());
        solutionResponse.setLiked(false);

        solutionResponse.setTags(solution.getChallenge().getChallengeTags().stream().map(challengeTag -> {
            TagResponse tagResponse = new TagResponse();
            tagResponse.setTagId(challengeTag.getTag().getTagId());
            tagResponse.setTagName(challengeTag.getTag().getName());
            return tagResponse;
        }).collect(Collectors.toList()));

        // I want that comments whose parentid is null in solutionResponse. those
        // subcomments should also follow the same. do it recursively.
        solutionResponse.setComments(mapComments(solution.getComments(), null));
        return solutionResponse;
    }

    List<CommentResponse> mapComments(List<Comment> comments, Long parentId) {
        return comments.stream()
                .filter(comment -> Objects.equals(
                        comment.getParentComment() == null ? null : comment.getParentComment().getCommentId(),
                        parentId))
                .map(comment -> {
                    CommentResponse commentResponse = new CommentResponse();
                    commentResponse = mapCommentToCommentResponse(comment);
                    commentResponse.setUserPhoto(comment.getUser().getPhotoUrl());
                    commentResponse.setSubComments(mapComments(comments, comment.getCommentId()));
                    return commentResponse;
                })
                .collect(Collectors.toList());
    }

    private CommentResponse mapCommentToCommentResponse(Comment comment) {

        CommentResponse commentResponse = new CommentResponse();

        commentResponse.setCommentId(comment.getCommentId());
        commentResponse.setContent(comment.getContent());
        commentResponse.setDate(comment.getPostedAt());
        commentResponse.setContent(comment.getContent());

        commentResponse.setName(comment.getUser().getName());
        commentResponse.setUserId(comment.getUser().getUserId());
        commentResponse.setSolutionId(comment.getSolution().getSolutionId());

        return commentResponse;
    }

}
