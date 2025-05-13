package com.anjoriarts.service;

import com.anjoriarts.dto.SignupDTO;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {


    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthServiceImpl(PasswordEncoder passwordEncoder , UserRepository userRepository){
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public SignupDTO saveUser(SignupDTO dto) {
        UserEntity user = new UserEntity();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNo(dto.getPhoneNo());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        UserEntity savedUser = userRepository.save(user);
        logger.info("User created successfully...");
        SignupDTO savedUserDto = new SignupDTO(savedUser.getUserId(), savedUser.getFirstName(),
                savedUser.getLastName(), savedUser.getEmail(), savedUser.getPhoneNo(),
                savedUser.getUsername(), savedUser.getPassword(), null);
        return savedUserDto;
    }
}
