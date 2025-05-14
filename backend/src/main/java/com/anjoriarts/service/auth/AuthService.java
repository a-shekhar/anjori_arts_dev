package com.anjoriarts.service.auth;

import com.anjoriarts.dto.LoginDTO;
import com.anjoriarts.dto.SignupDTO;
import com.anjoriarts.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {

    SignupDTO saveUser(SignupDTO dto);

    UserDTO authenticateAndLogin(LoginDTO loginDTO,  HttpServletRequest request);

}