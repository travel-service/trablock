//package com.trablock.web.service.img;
//
//import lombok.Data;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//@Data
//public class AuthService {
//
//    @Value("{spring.img.authUrl}")
//    private String authUrl;
//
//    @Value("{spring.img.storageUrl}")
//    private String storageUrl;
//
//    @Value("{spring.img.tenantId}")
//    private String tenantId;
//
//    @Value("{spring.img.username}")
//    private String username;
//
//    @Value("{spring.img.password}")
//    private String password;
//
//    @Data
//    public class TokenRequest {
//
//        private Auth auth = new Auth();
//
//        @Data
//        public class Auth {
//            private String tenantId;
//            private PasswordCredentials passwordCredentials = new PasswordCredentials();
//        }
//
//        @Data
//        public class PasswordCredentials {
//            private String username;
//            private String password;
//        }
//    }
//
//    private TokenRequest tokenRequest;
//    private RestTemplate restTemplate;
//
//    public AuthService(String authUrl, String tenantId, String username, String password) {
//        this.authUrl = authUrl;
//
//        this.tokenRequest = new TokenRequest();
//        this.tokenRequest.getAuth().setTenantId(tenantId);
//        this.tokenRequest.getAuth().getPasswordCredentials().setUsername(username);
//        this.tokenRequest.getAuth().getPasswordCredentials().setPassword(password);
//
//        this.restTemplate = new RestTemplate();
//    }
//
//    public String requestToken() {
//        String identityUrl = this.authUrl + "/tokens";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/json");
//
//        HttpEntity<TokenRequest> httpEntity
//                = new HttpEntity<TokenRequest>(this.tokenRequest, headers);
//
//        ResponseEntity<String> response
//                = this.restTemplate.exchange(identityUrl, HttpMethod.POST, httpEntity, String.class);
//
//        return response.getBody();
//    }
//}
