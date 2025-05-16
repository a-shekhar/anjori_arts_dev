package com.anjoriarts.service.user;

import com.anjoriarts.dto.UserDTO;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO fetchAndConvertToUserDto(String identifier) {
        Optional<UserEntity> fetchedUser = userRepository.findByEmail(identifier);
        if(fetchedUser.isEmpty()){
            throw new UsernameNotFoundException("Invalid credentials!!");
        }
        UserEntity user = fetchedUser.get();
        return this.convertUserEntityToDto(user);
    }

    private UserDTO convertUserEntityToDto(UserEntity user){
        return UserDTO.builder()
                .userId(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .email(user.getEmail())
                .countryCode(user.getCountryCode())
                .phoneNo(user.getPhoneNo())
                .password(user.getPassword())
                .publicImageUrl(user.getProfileImageUrl())
                .role(user.getRole())
                .build();
    }

    @Override
    @Transactional
    public UserDTO updateUserProfile(Principal principal, UserDTO userDTO) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(principal.getName());

        if(userOpt.isEmpty()){
            throw  new UsernameNotFoundException("User not found");
        }

        UserEntity fetchedUser = userOpt.get();

        fetchedUser.setFirstName(userDTO.getFirstName());
        fetchedUser.setLastName(userDTO.getLastName());
        fetchedUser.setUsername(userDTO.getUsername());
        fetchedUser.setPhoneNo(userDTO.getPhoneNo());

        UserEntity savedUser = userRepository.save(fetchedUser);

        logger.info("User profile updated successfully..");

        return this.convertUserEntityToDto(savedUser);
    }

    @Override
    @Transactional
    public UserDTO updatePassword(String identifier, String rawPassword){
        Optional<UserEntity> userOpt = userRepository.findByEmail(identifier);

        if(userOpt.isEmpty()){
            throw  new UsernameNotFoundException("User not found");
        }

        UserEntity fetchedUser = userOpt.get();

        fetchedUser.setPassword(passwordEncoder.encode(rawPassword));

        userRepository.save(fetchedUser);

        logger.info("User reset password successfully...");

        return this.convertUserEntityToDto(fetchedUser);
    }
}
