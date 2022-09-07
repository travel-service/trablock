package com.trablock.web.service.member;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.trablock.web.dto.mail.EmailAuthDto;
import com.trablock.web.dto.member.MemberPwdDto;
import com.trablock.web.dto.member.MemberResponseDto;
import com.trablock.web.dto.member.MemberSaveDto;
import com.trablock.web.dto.member.MemberUpdateDto;
import com.trablock.web.entity.member.LoginForm;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Map;

public interface MemberService {
    ResponseEntity<MemberResponseDto> memberSignUp(MemberSaveDto memberSaveDto);

    ResponseEntity<MemberResponseDto> confirmEmail(EmailAuthDto requestDto);

    ResponseEntity<MemberResponseDto> emailValidation(String email);

    ResponseEntity<MemberResponseDto> memberLogin(LoginForm loginForm, HttpServletResponse response);

    ResponseEntity<MemberResponseDto> memberLogout(HttpServletRequest request, HttpServletResponse response);

    ResponseEntity<MemberResponseDto> getMemberPage(HttpServletRequest request);

    ResponseEntity<MemberResponseDto> getMemberImg(HttpServletRequest request);

    ResponseEntity<MemberResponseDto> updateMemberImg(MultipartFile multipartFile, String userName) throws IOException;

    ResponseEntity<MemberResponseDto> memberEditPage(HttpServletRequest request);

    ResponseEntity<MemberResponseDto> updateComment(Map<String, String> bio, HttpServletRequest request);

    ResponseEntity<MemberResponseDto> updateNickName(String nickname, HttpServletRequest request);

    ResponseEntity<MemberResponseDto> updateMember(MemberUpdateDto memberUpdateDto, HttpServletRequest request);

    ResponseEntity<MemberResponseDto> getTmpPassword(Map<String, String> userInfo);

    ResponseEntity<MemberResponseDto> getMemberInfo(HttpServletRequest request);

    ResponseEntity<MemberResponseDto> memberRefreshToAccess(HttpServletRequest request, HttpServletResponse response);

    ResponseEntity<MemberResponseDto> updateMemberPwd(HttpServletRequest request, MemberPwdDto memberPwdDto);

    ResponseEntity<MemberResponseDto> memberValidation(String userName);

    ResponseEntity<MemberResponseDto> checkValidNickName(String nickname);
}
