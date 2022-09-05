package com.trablock.web.service.img;

import lombok.Data;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.HttpMessageConverterExtractor;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;

@Data
@ComponentScan
public class ImageService {

    @Data
    static public class AuthService {
        // Inner class for the request body
        @Data
        public class TokenRequest {

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

        private String authUrl;
        private TokenRequest tokenRequest;
        private RestTemplate restTemplate;

        public AuthService(String authUrl, String tenantId, String username, String password) {
            this.authUrl = authUrl;

            // 요청 본문 생성
            this.tokenRequest = new TokenRequest();
            this.tokenRequest.getAuth().setTenantId(tenantId);
            this.tokenRequest.getAuth().getPasswordCredentials().setUsername(username);
            this.tokenRequest.getAuth().getPasswordCredentials().setPassword(password);

            this.restTemplate = new RestTemplate();
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
    }


    private String tokenId;
    private String storageUrl;
    private RestTemplate restTemplate;

    public ImageService(String storageUrl, String tokenId) {
        this.setStorageUrl(storageUrl);
        this.setTokenId(tokenId);

        this.restTemplate = new RestTemplate();
    }

    private String getUrl(String containerName, String objectName) {
        return this.getStorageUrl() + "/" + containerName + "/" + objectName;
    }

    public String uploadObject(String containerName, String objectName, final InputStream inputStream) {
        String url = this.getUrl(containerName, objectName);

        // InputStream을 요청 본문에 추가할 수 있도록 RequestCallback 오버라이드
        final RequestCallback requestCallback = new RequestCallback() {
            public void doWithRequest(final ClientHttpRequest request) throws IOException {
                request.getHeaders().add("X-Auth-Token", tokenId);
                IOUtils.copy(inputStream, request.getBody());
            }
        };

        // 오버라이드한 RequestCallback을 사용할 수 있도록 설정
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setBufferRequestBody(false);
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        HttpMessageConverterExtractor<String> responseExtractor
                = new HttpMessageConverterExtractor<String>(String.class, restTemplate.getMessageConverters());

        // API 호출
        restTemplate.execute(url, HttpMethod.PUT, requestCallback, responseExtractor);

        return url;
    }
}
