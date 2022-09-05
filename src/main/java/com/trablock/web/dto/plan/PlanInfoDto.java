package com.trablock.web.dto.plan;

import com.trablock.web.entity.plan.enumtype.PlanComplete;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(of = "planId")
public class PlanInfoDto {

    private Long planId;
    private String name;
    private int periods;
    private String createdDate;
    private PlanComplete planComplete;
    private List<Long> userDirectoryIds;
    private String thumbnail;

    public PlanInfoDto(Long planId, String name, int periods, LocalDateTime createdDate, PlanComplete planComplete, String thumbnail) {
        this.planId = planId;
        this.name = name;
        this.periods = periods;
        this.createdDate = createdDate.toString().substring(0, 10);
        this.planComplete = planComplete;
        this.thumbnail = thumbnail;
    }

    public PlanInfoDto(Long planId, String name, int periods, String createdDate, PlanComplete planComplete, List<Long> userDirectoryIds, String thumbnail) {
        this.planId = planId;
        this.name = name;
        this.periods = periods;
        this.createdDate = createdDate.substring(0, 10);
        this.planComplete = planComplete;
        this.userDirectoryIds = userDirectoryIds;
        this.thumbnail = thumbnail;
    }
}
