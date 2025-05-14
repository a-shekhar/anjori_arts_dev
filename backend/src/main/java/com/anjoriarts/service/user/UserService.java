package com.anjoriarts.service.user;

import com.anjoriarts.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    UserDTO convertUserDetailsToDto(UserDetails userDetails);

}
