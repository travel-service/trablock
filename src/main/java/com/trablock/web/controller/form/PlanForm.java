package com.trablock.web.controller.form;

import com.trablock.web.entity.plan.enumtype.PlanComplete;
import com.trablock.web.entity.plan.enumtype.PlanStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlanForm {

    private String depart;
    private String name;
    private int periods;
    private PlanStatus planStatus;
    private PlanComplete planComplete;
}
