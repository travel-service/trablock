package com.trablock.web.controller.plan;

import com.trablock.web.controller.form.Form;
import com.trablock.web.dto.plan.DayDto;
import com.trablock.web.dto.plan.PlanDto;
import com.trablock.web.dto.plan.UserPlanUpdateDto;
import com.trablock.web.entity.member.Member;
import com.trablock.web.entity.plan.Day;
import com.trablock.web.entity.plan.Plan;
import com.trablock.web.global.HTTPStatus;
import com.trablock.web.service.img.AuthService;
import com.trablock.web.service.img.ImageService;
import com.trablock.web.service.location.LocationService;
import com.trablock.web.service.plan.interfaceC.ConceptService;
import com.trablock.web.service.plan.interfaceC.DayService;
import com.trablock.web.service.plan.interfaceC.PlanService;
import com.trablock.web.service.plan.interfaceC.SelectedLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.trablock.web.converter.Converter.*;
import static com.trablock.web.converter.Converter.UserDay;
import static com.trablock.web.converter.Converter.UserPlan;
import static java.util.stream.Collectors.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class PlanController {

    private final PlanService planService;
    private final DayService dayService;
    private final SelectedLocationService selectedLocationService;
    private final LocationService locationService;
    private final ConceptService conceptService;
    private final AuthService authService;

    @PostMapping("plans")
    public CreatePlan createPlan(@RequestBody Form form, HttpServletRequest request){
        Member member = planService.getMemberFromPayload(request);

        Long planId = planService.createPlan(form, member).getId();

        String message = "Plan??? ??????????????? ?????????????????????.";

        return new CreatePlan(HTTPStatus.Created.getCode(), message, planId);
    }

    @PostMapping("{planId}/thumbnail")
    public Result uploadImage(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable("planId") Long planId
    ) throws IOException {

        Plan plan = planService.findPlan(planId);

        Object token = authService.requestToken();

        ImageService imgTest = new ImageService(authService.getStorageUrl(), token.toString());

        String imageDefault = "https://api-storage.cloud.toast.com/v1/AUTH_92bb02eefaa74ad6a53a63ebc9abba2f/trablock/%EC%8B%9C%EC%95%882.jpg";

        if (file==null) {
            planService.uploadImage(imageDefault, planId);

        } else {
            if (plan.getThumbnail() != null && !plan.getThumbnail().equals(imageDefault)) {
                List<String> objectName = Arrays.asList(plan.getThumbnail().split("/"));

                imgTest.deleteObject(authService.getContainerName(), objectName.get(objectName.size() - 1));
            }

            String thumbnail = imgTest.uploadObject(authService.getContainerName(), LocalDateTime.now().toString(), file.getInputStream());

            planService.uploadImage(thumbnail, planId);
        }

        return new Result(HTTPStatus.Created.getCode(), "????????? ??????????????? ?????????????????????.");
    }


    @GetMapping("plan/{planId}")
    public UserPlan getUserPlans(@PathVariable("planId") Long planId, HttpServletRequest request) {
        Member member = planService.getMemberFromPayload(request);

        PlanDto planDto = planService.getOnePlanDto(planId, member);

        String message = "Plan??? ??????????????? ?????????????????????.";

        return new UserPlan(HTTPStatus.OK.getCode(), message, planDto);
    }


    @PostMapping("plan/{planId}/concept")
    public UpdateConcept updateUserPlanConcept(@PathVariable("planId") Long planId,
                                               HttpServletRequest request,
                                               @RequestBody Form form) {

        Member member = planService.getMemberFromPayload(request);

        if (member.getId() == null) {
            String errorMessage = "???????????? ?????? ???????????????.";

            return new UpdateConcept(HTTPStatus.Unauthorized.getCode(), errorMessage);

        } else {
            conceptService.updateConcept(planId, form);

            String message = "Concept??? ??????????????? ?????? ??? ???????????? ???????????????.";

            return new UpdateConcept(HTTPStatus.Created.getCode(), message);
        }
    }


    @GetMapping("plan/{planId}/concept")
    public ResponseEntity<?> usersConcepts(@PathVariable("planId") Long planId, HttpServletRequest request) {
        Member memberFromPayload = planService.getMemberFromPayload(request);

        if (memberFromPayload.getId() != null) {
            List<String> conceptIdForPlanIdToList = conceptService.findConceptIdForPlanIdToList(planId);
            Map<String, Object> conceptResult = new HashMap<>();
            conceptResult.put("conceptForm", conceptIdForPlanIdToList);
            conceptResult.put("planId", planId);

            return ResponseEntity.ok().body(conceptResult);
        } else {
            throw new IllegalStateException("???????????? ?????? ???????????????.");
        }
    }

    @PostMapping("plan/{planId}/day")
    public CreateDay createDay(@RequestBody Form form, HttpServletRequest request, @PathVariable("planId") Long planId) {

        Member member = planService.getMemberFromPayload(request);

        if (member.getId() == null) {
            String errorMessage = "???????????? ?????? ???????????????.";

            return new CreateDay(HTTPStatus.Unauthorized.getCode(), errorMessage);
        } else {
            dayService.createDay(form, planId);

            String message = "Day??? ??????????????? ?????????????????????.";

            return new CreateDay(HTTPStatus.Created.getCode(), message);
        }
    }


    @GetMapping("plan/{planId}/day")
    public UserDay getDaysInPlan(@PathVariable("planId") Long planId, HttpServletRequest request) {
        Member memberFromPayload = planService.getMemberFromPayload(request);

        String message = "Day??? ??????????????? ?????????????????????.";

        if (memberFromPayload.getId() != null) {
            List<Day> dayList = dayService.findDayIdForPlanIdToList(planId);
            List<DayDto> dayDtos = dayList.stream().map(Day::toDto).collect(toList());
            return new UserDay(HTTPStatus.OK.getCode(), message, dayDtos);
        } else {
            String errorMessage = "???????????? ?????? ???????????????.";

            return new UserDay(HTTPStatus.Unauthorized.getCode(), errorMessage, null);
        }
    }


    @PutMapping("plan/{planId}/day")
    public GetDay updateUserPlanDay(@PathVariable("planId") Long planId,
                                    HttpServletRequest request,
                                    @RequestBody Form form) {

        Member member = planService.getMemberFromPayload(request);

        if (member.getId() == null) {
            String errorMessage = "???????????? ?????? ???????????????.";

            return new GetDay(HTTPStatus.Unauthorized.getCode(), errorMessage);
        } else {
            dayService.updateDay(planId, form);

            String message = "Day??? ??????????????? ?????? ???????????????.";

            return new GetDay(HTTPStatus.Created.getCode(), message);
        }
    }


    @GetMapping("plan/{planId}/selected-location")
    public ResponseEntity usersSelectedLocation(@PathVariable("planId") Long planId, HttpServletRequest request) {
        Member member = planService.getMemberFromPayload(request);
        Plan plan = planService.returnPlan(planId, member); // ?????? ????????? PathVariable id??? ?????? Plan ?????? ??????
        List<Long> locationIdList = selectedLocationService.findLocationIdList(plan); // LocationId ????????? ????????? ??????
        return ResponseEntity.ok().body(locationService.getMarkAndBlockLocationsFromLocationIds(locationIdList));
    }


    @PostMapping("plan/{planId}")
    public UpdatePlan updateUserPlan(@PathVariable("planId") Long planId,
                                     HttpServletRequest request,
                                     @RequestBody UserPlanUpdateDto userPlanUpdateDto) {

        Member member = planService.getMemberFromPayload(request);

        planService.updateUserPlanContent(planId, member, userPlanUpdateDto);

        String message = "Plan??? ??????????????? ?????? ???????????????.";

        return new UpdatePlan(HTTPStatus.Created.getCode(), message);
    }


    @PostMapping("plan/{planId}/selected-location")
    public UpdateSelectedLocation updateUserPlanSelectedLocation(@PathVariable("planId") Long planId,
                                                                 HttpServletRequest request,
                                                                 @RequestBody Form form) {
        Member member = planService.getMemberFromPayload(request);

        if (member.getId() == null) {
            String errorMessage = "???????????? ?????? ???????????????.";

            return new UpdateSelectedLocation(HTTPStatus.Unauthorized.getCode(), errorMessage);
        } else {
            selectedLocationService.updateSelectedLocation(planId, form);

            String message = "SelectedLocation??? ??????????????? ?????? ??? ???????????? ???????????????.";

            return new UpdateSelectedLocation(HTTPStatus.Created.getCode(), message);
        }
    }
}