package com.eshka.service;

import com.eshka.entity.Team;

import java.util.List;

public interface TeamService {

    Team findById(long id);

    Team createNewTeam(Team team);

    Team editTeam(Team team);

    String generateJoinLink(Team team, Boolean force);

    void deleteById(long id);
}