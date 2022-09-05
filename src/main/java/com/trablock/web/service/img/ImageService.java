package com.trablock.web.service.img;

import lombok.Data;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpMessageConverterExtractor;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Data
@Service
public class ImageService {

    @Value("${spring.img.tenantId}")
    private String tenantId;

    @Value("${spring.img.username}")
    private String username;

    @Value("${spring.img.password}")
    private String password;

    @Value("${spring.img.authUrl}")
    private String authUrl;

    @Value("${spring.img.storageUrl}")
    private String storageUrl;

    @Data
    static class TokenRequest {

        private Auth auth = new Auth();

        @Data
        public class Auth {
            private String tenantId;
            private PasswordCredentials passwordCredentials = new PasswordCredentials();
        }

        @Data
        public class PasswordCredentials {
            private String username;
            private String password;
        }
    }

    String containerName = "trablock";
    RestTemplate restTemplate;
    TokenRequest tokenRequest;
    String tokenId = "";


    public ImageService(@Value("${spring.img.authUrl}") String authUrl,
                        @Value("${spring.img.storageUrl}") String storageUrl,
                        @Value("${spring.img.tenantId}") String tenantId,
                        @Value("${spring.img.username}") String username,
                        @Value("${spring.img.password}") String password) {
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

    public String requestToken() {
        String identityUrl = this.authUrl + "/tokens";

        // 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        HttpEntity<TokenRequest> httpEntity
                = new HttpEntity<TokenRequest>(this.tokenRequest, headers);

        // 토큰 요청
        ResponseEntity<String> response
                = this.restTemplate.exchange(identityUrl, HttpMethod.POST, httpEntity, String.class);

        return response.getBody();
    }

    private String getUrl(String containerName) {
        return this.storageUrl + "/" + containerName;
    }

    private String getUrl(String containerName, String objectName) {
        return this.storageUrl + "/" + containerName + "/" + objectName;
    }

    public String uploadObject(String objectName, MultipartFile multipartFile){
        String url = this.getUrl(this.getContainerName(), objectName);
        RequestCallback requestCallback = new RequestCallback() {
            public final void doWithRequest(ClientHttpRequest request) throws IOException {
                request.getHeaders().add("X-Auth-Token", ImageService.this.getTokenId());
                IOUtils.copy(multipartFile.getInputStream(), request.getBody());
            }
        };

        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setBufferRequestBody(false);
        RestTemplate restTemplate = new RestTemplate(requestFactory);
        HttpMessageConverterExtractor<String> responseExtractor = new HttpMessageConverterExtractor<>(String.class, restTemplate.getMessageConverters());
        restTemplate.execute(url, HttpMethod.PUT, requestCallback, responseExtractor);

        return url;
    }
}
