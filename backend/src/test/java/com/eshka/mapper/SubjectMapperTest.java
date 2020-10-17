package com.eshka.mapper;

import com.eshka.dto.response.SubjectResponse;
import com.eshka.entity.Subject;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SubjectMapperTest {
    private Subject subject;
    private SubjectResponse subjectResponse;

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
    }

    @Test
    public void subjectToSubjectResponse() {
        SubjectResponse actual = SubjectMapper.INSTANCE.subjectToSubjectResponse(subject);
        assertEquals(subjectResponse, actual);
    }
}