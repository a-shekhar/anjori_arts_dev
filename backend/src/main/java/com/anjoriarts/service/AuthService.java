package com.anjoriarts.service;

import com.anjoriarts.dto.SignupDTO;

public interface AuthService {

    SignupDTO saveUser(SignupDTO dto);

}