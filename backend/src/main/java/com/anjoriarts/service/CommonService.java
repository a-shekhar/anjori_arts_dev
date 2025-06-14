package com.anjoriarts.service;

import com.anjoriarts.entity.MediumEntity;

import java.util.List;

public interface CommonService {

    List<MediumEntity> getMediumEntities (List<String> mediums);

}
