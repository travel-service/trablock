//package com.trablock.web.service.img;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.NonNull;
//import org.apache.tomcat.util.http.fileupload.IOUtils;
//import org.springframework.http.*;
//import org.springframework.http.client.ClientHttpRequest;
//import org.springframework.http.client.SimpleClientHttpRequestFactory;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.HttpMessageConverterExtractor;
//import org.springframework.web.client.RequestCallback;
//import org.springframework.web.client.RestTemplate;
//
//import java.io.IOException;
//import java.io.InputStream;
//
//@Data
//public class ObjectService {
//
//    String tokenId = "";
//    private String storageUrl;
//    private RestTemplate restTemplate;
//    private String containerName = "trablock";
//
//    public ObjectService(String storageUrl, String tokenId) {
//        this.setStorageUrl(storageUrl);
//        this.setTokenId(tokenId);
//
//        this.restTemplate = new RestTemplate();
//    }
//
//    private String getUrl(@NonNull String containerName, @NonNull String objectName) {
//        return this.getStorageUrl() + "/" + containerName + "/" + objectName;
//    }
//
//    public String uploadObject(String objectName, final InputStream inputStream) {
//        String url = this.getUrl(containerName, objectName);
//
//        final RequestCallback requestCallback = new RequestCallback() {
//            public void doWithRequest(final ClientHttpRequest request) throws IOException {
//                request.getHeaders().add("X-Auth-Token", tokenId);
//                IOUtils.copy(inputStream, request.getBody());
//            }
//        };
//
//        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
//        requestFactory.setBufferRequestBody(false);
//        RestTemplate restTemplate = new RestTemplate(requestFactory);
//
//        HttpMessageConverterExtractor<String> responseExtractor
//                = new HttpMessageConverterExtractor<String>(String.class, restTemplate.getMessageConverters());
//
//        // API 호출
//        restTemplate.execute(url, HttpMethod.PUT, requestCallback, responseExtractor);
//
//        return url;
//    }
//}
