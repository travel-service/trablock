package com.trablock.web.entity.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
public class MemberProfile {

    @NotNull
    private String nickName;
    private String memberImg;
    private String bio;

    protected MemberProfile() {}
}
