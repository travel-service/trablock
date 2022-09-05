package com.trablock.web.controller.form;

import com.trablock.web.entity.plan.enumtype.PlanComplete;
import com.trablock.web.entity.plan.enumtype.PlanStatus;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class Form {

    private PlanForm planForm;


    private ConceptForm conceptForm;
    private SelectedLocationForm selectedLocationForm;
    private DayForm dayForm;

    private String depart;
    private String name;
    private int periods;
    private PlanStatus planStatus;
    private PlanComplete planComplete;
}
