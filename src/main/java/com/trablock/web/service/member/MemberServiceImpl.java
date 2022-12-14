package com.trablock.web.service.member;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.trablock.web.config.jwt.JwtTokenProvider;
import com.trablock.web.config.jwt.JwtTokenService;
import com.trablock.web.controller.exception.MemberException;
import com.trablock.web.dto.mail.EmailAuthDto;
import com.trablock.web.dto.mail.MailDto;
import com.trablock.web.dto.member.MemberPwdDto;
import com.trablock.web.dto.member.MemberResponseDto;
import com.trablock.web.dto.member.MemberSaveDto;
import com.trablock.web.dto.member.MemberUpdateDto;
import com.trablock.web.entity.auth.RefreshToken;
import com.trablock.web.entity.member.*;
import com.trablock.web.repository.member.EmailAuthRepository;
import com.trablock.web.repository.member.MemberRepository;
import com.trablock.web.repository.member.TokenRepository;
import com.trablock.web.service.file.FileService;
import com.trablock.web.service.img.AuthService;
import com.trablock.web.service.img.ImageService;
import com.trablock.web.service.mail.MailServiceImpl;
//import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.MediaType.parseMediaType;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private final EmailAuthRepository emailAuthRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private final AuthService authService;
    private final JwtTokenService jwtTokenService;
    private final MailServiceImpl mailService;
    private final MemberResponseDto responseDto;

    /**
     * ????????????
     * @param memberSaveDto
     * @return ?????? nickName
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberSignUp(MemberSaveDto memberSaveDto) {
        boolean CanSignUp = memberRepository.existsByUserName((memberSaveDto.getUserName())); // ????????? ?????? ??????
        String pwd = passwordEncoder.encode(memberSaveDto.getPassword());

        if (!CanSignUp) {
            EmailAuth emailAuth = emailAuthRepository.save(EmailAuth.builder().email(memberSaveDto.getEmail()).build());
            memberRepository.save(Member.builder().memberSaveDto(memberSaveDto).pwd(pwd).build());
            
            MailDto mailDto = mailService.emailAuthMail(emailAuth.getEmail(), emailAuth.getUuid());
            mailService.sendMail(mailDto); // ?????? ?????? (?????? ?????? ??????)

            MemberResponseDto res = responseDto.successMemberSignUp(memberSaveDto.getNickName());
            return ResponseEntity.status(HttpStatus.CREATED).body(res);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(responseDto.failMemberSignUp());

    }

    @Override
    public ResponseEntity<MemberResponseDto> confirmEmail(EmailAuthDto requestDto) {
        EmailAuth emailAuth = emailAuthRepository.findValidAuthByEmail(requestDto.getEmail(), requestDto.getUuid(), LocalDateTime.now()).orElse(null);

        if (emailAuth == null) {
            return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(responseDto.failEmailAuth());
        }

        Member member = memberRepository.findByEmail(requestDto.getEmail()).orElseThrow(MemberException::new);
        emailAuth.useToken();
        member.emailVerifiedSuccess();
        log.info("member = {}", member);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseDto.successEmailAuth());
    }

    /**
     * ?????????
     * @param loginForm
     * @param response
     * @return ?????? nickName
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberLogin(LoginForm loginForm, HttpServletResponse response) {
        Member member = memberRepository.findByUserName(loginForm.getUserName())
                .orElse(null);

        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDto.invalidUserNameOrPwd());
        }

        if (!passwordEncoder.matches(loginForm.getPassword(), member.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto.invalidUserNameOrPwd());
        }

        String accessToken = jwtTokenProvider.createAccessToken(member.getUsername(), member.getRoles());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getUsername(), member.getRoles());
        jwtTokenProvider.setHeaderAccessToken(response, accessToken);
        jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);
        tokenRepository.save(RefreshToken.builder().refreshToken(refreshToken).build());

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.successLogin(member.getMemberProfile().getNickName()));
    }

    /**
     * ?????? ????????????
     * @param request
     * @return
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberLogout(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenProvider.resolveRefreshToken(request);
        Long id = tokenRepository.findByRefreshToken(refreshToken);

        tokenRepository.deleteById(id);
        jwtTokenProvider.setHeaderLogoutRefreshToken(response, "");

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.successLogout());
    }

    /**
     * ?????? ??????????????? DATA return
     * @param request
     * @return nickname, bio, + .. ?????? ??????
     */
    @Override
    public ResponseEntity<MemberResponseDto> getMemberPage(HttpServletRequest request) {
        String userName = jwtTokenService.tokenToUserName(request);
        Member member = memberRepository.findByUserName(userName).orElseThrow(() -> new IllegalArgumentException("???????????? ????????? ????????????."));

        // ?????? ????????? + ..
        String nickName = jwtTokenService.tokenToNickName(request);
        String bio = member.getMemberProfile().getBio();

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.successGetMemberPage(nickName, bio));
    }

    /**
     * ?????? ????????? ??????
     * @param request
     * @return MemberImg
     */
    @Override
    public ResponseEntity<MemberResponseDto> getMemberImg(HttpServletRequest request) {
        String userName = jwtTokenService.tokenToUserName(request);
        Optional<Member> member = memberRepository.findByUserName(userName);

        String memberImg = member.get().getMemberProfile().getMemberImg();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto.successGetMemberImg(memberImg));
    }

    @Override
    public ResponseEntity<MemberResponseDto> updateMemberImg(MultipartFile file, String userName) throws IOException {
        Object token = authService.requestToken();
        ImageService imgService = new ImageService(authService.getStorageUrl(), token.toString());
        String imgDefault = "https://api-storage.cloud.toast.com/v1/AUTH_92bb02eefaa74ad6a53a63ebc9abba2f/trablock/member_default_img.png";
        Member member = memberRepository.findByUserName(userName).get();

        if (file.isEmpty()) {
            member.getMemberProfile().setMemberImg(imgDefault);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseDto.failChangeMemberImg());

        } else {

            String memberImg = member.getMemberProfile().getMemberImg();
            if (memberImg != null && !memberImg.equals(imgDefault)) {
                List<String> object = Arrays.asList(memberImg.split("/"));

                imgService.deleteObject(authService.getContainerName(), object.get(object.size()-1));
            }

            String newMemberImg = imgService.uploadObject(authService.getContainerName(), userName, file.getInputStream());
            member.getMemberProfile().setMemberImg(newMemberImg);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successChangeMemberImg());

    }
    /**
     * ????????? ???????????? ?????? ?????????
     * @param request
     * @return MemberProfile, MemberInfo (?????????, ????????????, ??????, ??????, ????????????, ?????????)
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberEditPage(HttpServletRequest request) {
        String userName = jwtTokenService.tokenToUserName(request);
        Member member = memberRepository.findByUserName(userName).orElseThrow();

        MemberProfile mp = member.getMemberProfile();
        MemberInfo mi = member.getMemberInfo();

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.successGetMemberEditPage(mp, mi));
    }

    /**
     * ?????? ??? ??? ?????? ?????? ?????????
     * @param bio
     * @param request
     */
    @Override
    public ResponseEntity<MemberResponseDto> updateComment(Map<String, String> bio, HttpServletRequest request) {
        Long id = jwtTokenService.tokenToUserId(request);
        Member member = memberRepository.findMemberId(id).orElseThrow();
        member.getMemberProfile().setBio(bio.get("bio"));

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successEditMemberProfile(member.getMemberProfile()));

    }

    /**
     * ?????? ????????? ??????
     * @param nickname
     * @param request
     * @return
     */
    @Override
    public ResponseEntity<MemberResponseDto> updateNickName(String nickname, HttpServletRequest request) {
        Long id = jwtTokenService.tokenToUserId(request);
        Member member = memberRepository.findMemberId(id).orElseThrow();
        member.getMemberProfile().setNickName(nickname);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successEditMemberProfile(member.getMemberProfile()));
    }

    /**
     * ?????? ???????????? ?????? (?????????, ????????????, ?????? ??????)
     * @param memberUpdateDto
     * @param request
     */
    @Override
    public ResponseEntity<MemberResponseDto> updateMember(MemberUpdateDto memberUpdateDto, HttpServletRequest request) {
        Long id = jwtTokenService.tokenToUserId(request);
        Member member = memberRepository.findMemberId(id).orElseThrow();

        member.getMemberProfile().setNickName(memberUpdateDto.getNickName());
        member.getMemberProfile().setBio(memberUpdateDto.getBio());
        member.getMemberInfo().setBirthday(memberUpdateDto.getBirthday());
        member.getMemberInfo().setEmail(memberUpdateDto.getEmail());
        member.getMemberInfo().setGender(memberUpdateDto.getGender());

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successEditMemberInfo(member.getMemberProfile(), member.getMemberInfo()));
    }

    /**
     * ???????????? ?????? (?????? ???????????? ??????)
     * @return
     */
    @Override
    public ResponseEntity<MemberResponseDto> getTmpPassword(Map<String, String> userInfo) {
        String userName = userInfo.get("userName");
        String userEmail = userInfo.get("userEmail");

        Member member = memberRepository.findByUserName(userName).orElse(null);

        if (member == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDto.notFoundUserName());
        }

        if (member.getMemberInfo().getEmail().equals(userEmail)) {
            String tmpPwd = passwordEncoder.encode(pwdCombination());
            memberRepository.updateMemberPwd(tmpPwd, userName);

            MailDto mail = mailService.findPwdMail(tmpPwd, userEmail);
            mailService.sendMail(mail);

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successIssuePwd());

        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto.failIssuePwd());
    }

    /**
     * AccessToken??? ???????????? ????????? ?????? ????????????
     * @param request
     * @return
     */
    @Override
    public ResponseEntity<MemberResponseDto> getMemberInfo(HttpServletRequest request) {
        String accessToken = jwtTokenProvider.resolveAccessToken(request);

        if (accessToken != null) {
            if (jwtTokenProvider.validateToken(accessToken)) {
                String nickName = jwtTokenService.tokenToNickName(request);
                return ResponseEntity.status(HttpStatus.OK).body(responseDto.successLogin(nickName));

            } return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseDto.expireToken());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDto.notFoundAccessToken());
    }

    /**
     * RefreshToken ?????? AccessToken ????????? ??????
     * @param request
     * @param response
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberRefreshToAccess(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenProvider.resolveRefreshToken(request);

        if (refreshToken != null) {
            if (jwtTokenProvider.validateToken(refreshToken)) {
                String userName = jwtTokenProvider.getUserName(refreshToken);
                List<String> roles = jwtTokenProvider.getRoles(userName);
                String newAccessToken = jwtTokenProvider.createAccessToken(userName, roles);
                jwtTokenProvider.setHeaderAccessToken(response, newAccessToken);
                this.setAuthentication(newAccessToken);

                return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successCreateToken());
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseDto.expireToken());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDto.notFoundRefreshToken());
    }

    public void setAuthentication(String token) {
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /**
     * ?????? ???????????? ??????
      */
    @Override
    public ResponseEntity<MemberResponseDto>updateMemberPwd(HttpServletRequest request, MemberPwdDto memberPwdDto){
        String userName = jwtTokenService.tokenToUserName(request);
        Optional<Member> member = memberRepository.findByUserName(userName);

        String origin = memberPwdDto.getOriginPwd();

        if (passwordEncoder.matches(origin, member.get().getPassword())) {
            String newPwd = passwordEncoder.encode(memberPwdDto.getNewPwd());
            memberRepository.updateMemberPwd(newPwd, userName);

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDto.successEditMemberPwd());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDto.failEditMemberPwd());
    }

    /**
     * ????????? ?????? ??????
     * @param email
     * @return
     */
    @Override
    public ResponseEntity<MemberResponseDto> emailValidation(String email) {
        boolean isvalid = memberRepository.existsByEmail(email);

        if (isvalid) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDto.duplicateEmail());
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.canUseEmail());
    }


    /**
     * ?????? ????????? ??????
     * @param userName
     * @return boolean
     */
    @Override
    public ResponseEntity<MemberResponseDto> memberValidation(String userName) {
        boolean isvalid = memberRepository.existsByUserName(userName);
        if (isvalid) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDto.duplicateUserName());
        }

        return ResponseEntity.status(HttpStatus.OK).body(responseDto.canUseUserName());
    }

    /**
     * ????????? ?????? ??????
     * @param nickname
     * @return boolean
     */
    @Override
    public ResponseEntity<MemberResponseDto> checkValidNickName(String nickname) {
        boolean isvalid = memberRepository.existsByNickName(nickname);
        if (isvalid) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDto.duplicateNickName());
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseDto.canUseNickName());
    }

    /**
     * ?????????????????? ??????
     * @return
     */
    public String pwdCombination() {
        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String pwd = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            pwd += charSet[idx];
        }

        return pwd;
    }
}
