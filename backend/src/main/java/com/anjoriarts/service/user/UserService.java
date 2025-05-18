package com.anjoriarts.service.user;

import com.anjoriarts.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

public interface UserService {

    UserDTO fetchAndConvertToUserDto(String identifier);

    UserDTO updateUserProfile(Principal principal, UserDTO userDTO, MultipartFile profileImage);

    UserDTO updatePassword(String identifier, String rawPassword);

}
