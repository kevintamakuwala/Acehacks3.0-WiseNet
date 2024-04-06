package com.wisenet.backend.services.implementations;

import com.wisenet.backend.entities.Tag;
import com.wisenet.backend.repositories.TagRepository;
import com.wisenet.backend.responses.TagResponse;
import com.wisenet.backend.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.parser.TagElement;
import java.util.ArrayList;
import java.util.List;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;
    @Override
    public List<TagResponse> addTags(List<String> tags) {

        List<TagResponse> tagResponses = new ArrayList<>();

        for(String tag:tags)
        {
            Tag tag1 = new Tag();

            tag1.setName(tag);

            try
            {
                Tag tag2 = tagRepository.save(tag1);



                tagResponses.add(new TagResponse(tag2.getTagId(), tag2.getName()));
            }
            catch(DataIntegrityViolationException ex)
            {
                tagRepository.findByName(tag).ifPresent(tag2 -> tagResponses.add(new TagResponse(tag2.getTagId(), tag2.getName())));


                ex.printStackTrace();
            }
            catch (Exception e)
            {
                throw new RuntimeException("Exception");
            }
        }
        return tagResponses;
    }

    @Override
    public List<TagResponse> getTags() {

        List<Tag> tagList = tagRepository.findAll();

        List<TagResponse> tagResponseList = new ArrayList<>();

        for(Tag tag:tagList)
        {
            tagResponseList.add(new TagResponse(tag.getTagId(), tag.getName()));
        }
        return tagResponseList;
    }
}
