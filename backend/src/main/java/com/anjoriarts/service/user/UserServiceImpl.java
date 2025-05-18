package com.anjoriarts.service.user;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.UserDTO;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import com.anjoriarts.service.CloudinaryService;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    @Value("${spring.application.env}")
    private String env;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.cloudinaryService = cloudinaryService;
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
                .profileImageUrl(user.getProfileImageUrl())
                .role(user.getRole())
                .build();
    }

    @Override
    @Transactional
    public UserDTO updateUserProfile(Principal principal, UserDTO userDTO, MultipartFile profileImage) {
        try {
            Optional<UserEntity> userOpt = userRepository.findByEmail(principal.getName());

            if (userOpt.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }

            UserEntity fetchedUser = userOpt.get();

            // Saving profile image to cloudinary
            String imagePath = String.format(Consonants.USER_PROFILE_IMAGES_PATH, env, fetchedUser.getUserId());

            Map<String, Object> options = new HashMap<>();
            options.put("public_id", imagePath);
            options.put("overwrite", true);
            options.put("resource_type", "image");

            String imageUrl = cloudinaryService.uploadImagesWithConfig(profileImage, options);

            fetchedUser.setFirstName(userDTO.getFirstName());
            fetchedUser.setLastName(userDTO.getLastName());
            fetchedUser.setUsername(userDTO.getUsername());
            fetchedUser.setPhoneNo(userDTO.getPhoneNo());
            fetchedUser.setProfileImageUrl(imageUrl);

            UserEntity savedUser = userRepository.save(fetchedUser);

            logger.info("User profile updated successfully..");

            return this.convertUserEntityToDto(savedUser);
        } catch (Exception e) {
            logger.error("Error while updating profile" + e);
            throw e;
        }
    }

    @Override
    @Transactional
    public UserDTO updatePassword(String identifier, String rawPassword){
        try {
            Optional<UserEntity> userOpt = userRepository.findByEmail(identifier);

            if (userOpt.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }

            UserEntity fetchedUser = userOpt.get();

            fetchedUser.setPassword(passwordEncoder.encode(rawPassword));

            userRepository.save(fetchedUser);

            logger.info("User reset password successfully...");

            return this.convertUserEntityToDto(fetchedUser);
        } catch (Exception e) {
            logger.error("Error while resetting password" + e);
            throw e;
        }
    }
}
