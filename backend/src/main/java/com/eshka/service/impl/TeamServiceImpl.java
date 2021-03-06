package com.eshka.service.impl;

import com.eshka.dto.response.SubjectResponse;
import com.eshka.dto.response.TeamFullResponse;
import com.eshka.dto.response.UserShortResponse;
import com.eshka.entity.Subject;
import com.eshka.entity.Team;
import com.eshka.entity.User;
import com.eshka.exception.TeamNotFoundException;
import com.eshka.mapper.SubjectMapper;
import com.eshka.repository.TeamRepository;
import com.eshka.repository.UserRepository;
import com.eshka.service.TeamService;
import com.eshka.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final UserService userService;

    @Override
    public Team findById(long id) {
        return teamRepository.findById(id).orElseThrow(
                () -> new TeamNotFoundException("team not found"));
    }

    @Override
    public Team createNewTeam(Team team) {
        team.getUsers().add(userService.getCurrentUser());
        return teamRepository.save(team);
    }

    @Override
    public Team editTeam(Team team) {
        Team oldTeam = teamRepository.findById(team.getId()).orElseThrow(
                () -> new TeamNotFoundException("team not found"));
        oldTeam.setLink(team.getLink());
        oldTeam.setName(team.getName());
        oldTeam.setDescription(team.getDescription());
        return teamRepository.save(oldTeam);
    }

    @Override
    public String generateJoinLink(Team team, Boolean force) {
        if (force == null || !force) {
            String link = team.getLink();
            if (link != null) {
                return link;
            } else {
                return generateJoinLink(team, true);
            }
        } else {
            String joinLink = new Random()
                    .ints(48, 122 + 1)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(5)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();
            team.setLink(joinLink);
            teamRepository.save(team);
            return joinLink;
        }
    }

    @Override
    public void deleteById(long id) {
        teamRepository.deleteById(id);
    }

    @Override
    public void joinToTeam(User user, String link) {
        Team team = teamRepository.findByLink(link).orElseThrow(
                () -> new TeamNotFoundException("team not found"));
        Set<User> users = team.getUsers();
        users.add(user);
        team.setUsers(users);
        teamRepository.save(team);
    }
}
