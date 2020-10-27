package com.eshka.controller;

import com.eshka.dto.request.TeamRequest;
import com.eshka.dto.response.TeamResponse;
import com.eshka.entity.Team;
import com.eshka.mapper.TeamMapper;
import com.eshka.service.TeamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api("process all operations with team objects")
@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;
    private static final TeamMapper mapper = TeamMapper.INSTANCE;

    @ApiOperation("get team by id")
    @GetMapping("/{id}")
    public ResponseEntity<TeamResponse> findById(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.teamToTeamResponse(teamService.findById(Long.parseLong(id))),
                HttpStatus.OK);
    }

    @ApiOperation("create new team")
    @PostMapping
    public ResponseEntity<TeamResponse> createTeam(@RequestBody TeamRequest request) {
        Team team = mapper.teamRequestToTeam(request);
        return new ResponseEntity<>(mapper.teamToTeamResponse(teamService.createNewTeam(team)),
                HttpStatus.CREATED);
    }

    @ApiOperation("edit team")
    @PutMapping
    public ResponseEntity<TeamResponse> editTeam(@RequestBody TeamRequest request) {
        Team team = mapper.teamRequestToTeam(request);
        return new ResponseEntity<>(mapper.teamToTeamResponse(teamService.editTeam(team)),
                HttpStatus.OK);
    }

    @ApiOperation("join team")
    @GetMapping("/{id}")
    public ResponseEntity<TeamResponse> getJoinLink(@PathVariable(name = "id") String id) {
        return new ResponseEntity<>(mapper.teamToUserResponse(teamService.generateJoinLink(teamService.findById(Long.parseLong(id)))),
                HttpStatus.OK);
    }

    @ApiOperation("delete team by id")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTeam(@PathVariable(name = "id") String id) {
        teamService.deleteById(Long.parseLong(id));
    }
}
