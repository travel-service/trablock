package com.trablock.web.repository.plan;

import com.trablock.web.dto.plan.PlanDto;
import com.trablock.web.dto.plan.PlanInfoDto;
import com.trablock.web.entity.member.Member;
import com.trablock.web.entity.plan.Plan;
import com.trablock.web.entity.plan.enumtype.PlanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long>, PlanRepositoryCustom {

    @Query("select p from Plan p where p.member = :member")
    List<Plan> findPlansByMember(@Param("member") Member member);

    @Query("select p from Plan p where p.id = :planId")
    Optional<Plan> findPlanById(@Param("planId") Long planId);

    @Query("select p from Plan p where p.id = :planId and p.member = :member")
    Optional<Plan> findPlanByMember(@Param("planId") Long planId, @Param("member") Member member);

    @Query("select new com.trablock.web.dto.plan.PlanDto(p.id, p.depart, p.name, p.periods, p.thumbnail)" +
            " from Plan p where p.id = :planId and p.member = :member")
    Optional<PlanDto> getPlanDTOByMember(@Param("planId") Long planId, @Param("member") Member member);

    @Query("select p from Plan p where p.member = :member and p.planStatus =:status")
    List<Plan> findPlansByPlanStatus(@Param("member") Member member, @Param("status") PlanStatus status);

    @Query("select count(p) from Plan p where p.member = :member and p.planStatus = :status")
    int planCount(@Param("member") Member member, @Param("status")PlanStatus status);

    @Query("select count(p) from Plan p where p.member = :member and p.planStatus = 'TRASH'")
    int trashPlanCount(@Param("member") Member member);
}
