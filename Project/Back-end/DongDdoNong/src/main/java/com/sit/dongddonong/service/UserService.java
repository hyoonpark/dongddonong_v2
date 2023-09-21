package com.sit.dongddonong.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.sit.dongddonong.dto.TokenDto;
import com.sit.dongddonong.dto.UserDto;
import com.sit.dongddonong.model.RefreshToken;
import com.sit.dongddonong.model.User;
import com.sit.dongddonong.repository.RefreshTokenRepository;
import com.sit.dongddonong.repository.UserRepository;
import com.sit.dongddonong.util.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserService {

    @Value("${kakao.client-id}")
    String clientId;

    @Value("${kakao.redirect-uri}")
    String redirectUri;

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository tokenRepository;

    public UserDto login(String code) throws Exception {
        UserDto newUser = getKakaoUser(getAccessToken(code));
        Optional<User> user = userRepository.findById(newUser.getId());
//        if(user.isEmpty()){
//            userRepository.save(User.userToEntity(newUser));
//            user = userRepository.findById(newUser.getId());
//        }
//        log.info("[login] 계정을 찾았습니다. " + user);

        TokenDto token = jwtProvider.generateTokenDto(newUser.getId());

        RefreshToken refreshToken = RefreshToken.builder()
                .key(newUser.getId())
                .token(token.getRefreshToken())
                .build();
        tokenRepository.save(refreshToken);


        newUser.setAccessToken(token.getAccessToken());
        userRepository.save(User.userToEntity(newUser));

        return newUser;
    }
    public String getAccessToken(String code) throws Exception{

        String accessToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로 설정
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터를 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter((new OutputStreamWriter(conn.getOutputStream())));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=").append(clientId);
            sb.append("&redirect_uri=").append(redirectUri);
            sb.append("&code=").append(code);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            String result = getRequestResult(conn);

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonElement element = JsonParser.parseString(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();

            log.info("access_token : " + accessToken);

            bw.close();
        }
        catch (Exception e) {
            log.info(e.getMessage());
            throw e;
        }

        return accessToken;
    }

    public UserDto getKakaoUser(String token) {

        String reqURL = "https://kapi.kakao.com/v2/user/me";
        UserDto userDto = new UserDto();

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            String result = getRequestResult(conn);

            //Gson 라이브러리로 JSON파싱
            JsonElement element = JsonParser.parseString(result);
            JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
            JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");

            //dto에 저장하기
            userDto.setId(element.getAsJsonObject().get("id").getAsLong());
            userDto.setNickName(profile.getAsJsonObject().get("nickname").getAsString());
            userDto.setProfileImgUrl(profile.getAsJsonObject().get("profile_image_url").getAsString());
            userDto.setType("user");


            log.info(userDto.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return userDto;
    }

    private String getRequestResult(HttpURLConnection conn) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }
        br.close();
        return sb.toString();
    }

    public HttpHeaders setTokenHeaders(TokenDto tokenDto) {
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie cookie = ResponseCookie.from("RefreshToken", tokenDto.getRefreshToken())
                .path("/")
                .maxAge(60 * 60 * 24 * 7) // 쿠키 유효기간 7일로 설정
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        headers.add("Set-cookie", cookie.toString());
        headers.add("Authorization", tokenDto.getAccessToken());

        return headers;
    }
}