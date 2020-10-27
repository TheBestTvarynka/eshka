package com.eshka.entity;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "Team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "name", unique = true, nullable = false)
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "link", unique = true)
    private String link;
}