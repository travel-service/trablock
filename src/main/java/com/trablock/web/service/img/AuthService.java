package com.trablock.web.service.img;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Data
public class AuthService {

    private final AuthService.TokenRequest tokenRequest;
    private final RestTemplate restTemplate;
    private String tokenId;
    private final String containerName;
    private final String authUrl;
    private final String storageUrl;
    private final String tenantId;
    private final String username;
    private final String password;

    public RestTemplate getRestTemplate() {
        return this.restTemplate;
    }

    public String getTokenId() {
        return this.tokenId;
    }

    public void setTokenId( String var1) {
        this.tokenId = var1;
    }

    public String getContainerName() {
        return this.containerName;
    }

    public Object requestToken() throws JsonProcessingException {
        String identityUrl = this.authUrl + "/tokens";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        HttpEntity<TokenRequest> httpEntity = new HttpEntity<>(this.tokenRequest, headers);
        ResponseEntity<String> response = this.getRestTemplate().exchange(identityUrl, HttpMethod.POST, httpEntity, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode body = mapper.readTree(response.getBody());
        String var10001 = body.path("access").path("token").path("id").toString();
        this.setTokenId(var10001);
        return this.getTokenId();
    }

    public AuthService(@Value("${spring.img.authUrl}") String authUrl,
                       @Value("${spring.img.storageUrl}") String storageUrl,
                       @Value("${spring.img.tenantId}") String tenantId,
                       @Value("${spring.img.username}") String username,
                       @Value("${spring.img.password}") String password
    ) {
        this.authUrl = authUrl;
        this.storageUrl = storageUrl;
        this.tenantId = tenantId;
        this.username = username;
        this.password = password;
        this.tokenRequest = new TokenRequest();
        this.restTemplate = new RestTemplate();
        this.tokenId = "";
        this.containerName = "trablock";
        this.tokenRequest.getAuth().setTenantId(this.tenantId);
        this.tokenRequest.getAuth().getPasswordCredentials().setUsername(this.username);
        this.tokenRequest.getAuth().getPasswordCredentials().setPassword(this.password);
    }

    public static final class TokenRequest {
        private final AuthService.TokenRequest.Auth auth = new Auth();
        public final AuthService.TokenRequest.Auth getAuth() {
            return this.auth;
        }

        @Data
        public static final class Auth {
            private String tenantId;
            private AuthService.TokenRequest.PasswordCredentials passwordCredentials = new PasswordCredentials();

            public final String getTenantId() {
                return this.tenantId;
            }

            public final void setTenantId( String var1) {
                this.tenantId = var1;
            }

            public final AuthService.TokenRequest.PasswordCredentials getPasswordCredentials() {
                return this.passwordCredentials;
            }

            public final void setPasswordCredentials(AuthService.TokenRequest.PasswordCredentials var1) {
                this.passwordCredentials = var1;
            }
        }

        @Data
        public static final class PasswordCredentials {
            private String username;
            private String password;
        }
    }
}
