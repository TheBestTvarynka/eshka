package com.eshka.service.impl;

import com.eshka.entity.Team;
import com.eshka.exception.TeamNotFoundException;
import com.eshka.repository.TeamRepository;
import com.eshka.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;

    @Override
    public Team findById(long id) {
        return teamRepository.findById(id).orElseThrow(
                () -> new TeamNotFoundException("team not found"));
    }

    @Override
    public Team createNewTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team editTeam(Team team) {
        Team oldTeam = teamRepository.findById(team.getId()).orElseThrow(
                () -> new TeamNotFoundException("team not found"));
        oldTeam.setTitle(team.getTitle());
        oldTeam.setDescription(team.getDescription());
        return teamRepository.save(oldTeam);
    }

    @Override
    public void deleteById(long id) {
        teamRepository.deleteById(id);
    }
}
