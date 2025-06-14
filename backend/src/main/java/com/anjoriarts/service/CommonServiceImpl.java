package com.anjoriarts.service;

import com.anjoriarts.entity.MediumEntity;
import com.anjoriarts.repository.MediumRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommonServiceImpl implements CommonService{

    private final MediumRepository mediumRepo;

    public CommonServiceImpl(MediumRepository mediumRepo){
        this.mediumRepo = mediumRepo;
    }

    @Override
    public List<MediumEntity> getMediumEntities (List<String> mediums) {
        List<MediumEntity> mediumEntities = new ArrayList<>();
        for (String medium : mediums) {
            Optional<MediumEntity> mediumOpt = this.mediumRepo.findByCode(medium);
            MediumEntity mediumEnt = null;
            if (mediumOpt.isPresent()) {
                mediumEnt = mediumOpt.get();
            }
            mediumEntities.add(mediumEnt);
        }
        return mediumEntities;
    }
}
