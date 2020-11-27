package com.eshka.mapper;

import com.eshka.dto.request.UserDTO;
import com.eshka.dto.response.UserShortResponse;
import com.eshka.entity.User;
import com.eshka.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = {UserService.class})
public interface UserMapper {
    @Mappings({
            @Mapping(source = "user.userId", target = "id"),
    })
    UserShortResponse userToUserShort(User user);

    @Mappings({
            @Mapping(source = "user.userId", target = "id")
    })
    UserDTO userToUserDto(User user);
}
