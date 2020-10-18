package com.eshka.mapper;

import com.eshka.dto.request.SubjectRequest;
import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SubjectMapperTest {
    private Subject subject;
    private SubjectResponse subjectResponse;
    private SubjectRequest subjectRequest;

    @Before
    public void setUp() {
        this.subject = new Subject() {{
            setId(1);
            setDescription("description");
            setTitle("title");
        }};
        this.subjectResponse = new SubjectResponse() {{
            setId(subject.getId());
            setDescription(subject.getDescription());
            setTitle(subject.getTitle());
        }};
        this.subjectRequest = new SubjectRequest() {{
            setDescription(subject.getDescription());
            setTitle(subject.getTitle());
        }};
    }

    @Test
    public void subjectToSubjectResponse() {
        SubjectResponse actual = SubjectMapper.INSTANCE.subjectToSubjectResponse(subject);
        assertEquals(subjectResponse, actual);
    }

    @Test
    public void subjectRequestToSubject() {
        Subject actual = SubjectMapper.INSTANCE.subjectRequestToSubject(subjectRequest);
        assertEquals(subject.getDescription(), actual.getDescription());
        assertEquals(subject.getTitle(), actual.getTitle());
    }
}