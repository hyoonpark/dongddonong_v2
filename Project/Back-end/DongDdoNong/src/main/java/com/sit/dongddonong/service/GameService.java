package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.game.GameDto;
import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.model.game.Game;
import com.sit.dongddonong.model.game.GameRepository;
import com.sit.dongddonong.model.game.PlayerHistory;
import com.sit.dongddonong.model.user.User;
import com.sit.dongddonong.model.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GameService {
    private final GameRepository gameRepository;
    private final PlayerHistoryService playerHistoryService;
    private final UserRepository userRepository;

    private GameDto convertToDto(Game game) {
        return GameDto.fromEntity(game);
    }

    public void patchGame(GameDto gameDto) throws IOException {
        Game game = gameRepository.findById(String.valueOf(gameDto.getId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameDto.getId()));

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> game.putPlayerHistory(
                PlayerHistory.createPlayerHistory(playerHistory, game)
        ));

        if(!playerHistories.isEmpty()){
            game.updateIsAnalyzing(false);
        }
        gameRepository.save(game);

        if(game.getMode().equals("1")){
            game.getPlayerHistories().forEach(playerHistory ->
                    playerHistoryService.patchPlayerHistory(playerHistory.getId(), game.getUserId())
            );
        }

        kakaoAlert(gameDto);

    }

    private void kakaoAlert(GameDto gameDto) throws IOException {
        User user = userRepository.findById(gameDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. userId=" + gameDto.getUserId()));

        String accessToken = user.getKakaoAccessToken();
        String reqURL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);

            MultiValueMap<String, String> templateObject = new LinkedMultiValueMap<>();
            templateObject.add("object_type", "text");
            templateObject.add("text", "분석이 완료 되었습니다.");

            MultiValueMap<String, String> link = new LinkedMultiValueMap<>();
            link.add("web_url", "https://j9e103.p.ssafy.io/");
            link.add("mobile_web_url", "https://j9e103.p.ssafy.io/");
            templateObject.add("link", link.toString());

            templateObject.add("button_title", "바로 확인");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("template_object", templateObject.toString());

            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);

            RestTemplate rt = new RestTemplate();

            ResponseEntity<String> response = rt.exchange(
                    reqURL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("메시지를 성공적으로 보냈습니다.");
            } else {
                log.error("메시지를 성공적으로 보내지 못했습니다. 응답 코드: " + response.getStatusCode());
            }
        }
        catch (Exception e){
            log.error("카카오 메시지를 보내는 도중 에러가 있습니다.");
        }


    }


    public List<GameDto> getAllGames() {
        List<Game> games = gameRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> getAllByAssignedGames(long userId, boolean isAssigned) {
        List<Game> games = gameRepository.findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(userId, isAssigned);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> getAllGamesByUserId(long userId) {
        List<Game> games = gameRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

//    public void checkGameUserAssigned(long gameId) {
//        GameDto gameDto = getGame(gameId);
//        Game game = gameRepository.findById(String.valueOf(gameId))
//                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameId));
//        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();
//        boolean allAssigned = playerHistories.stream()
//                .allMatch(ph -> ph.getUserId() != null);
//        if (allAssigned) {
//            game.updateGameIsAssigned(true);
//        }
//    }

    public GameDto getGame(long gameId) {
        return convertToDto(gameRepository.findById(String.valueOf(gameId)).orElse(null));
    }

    public List<GameDto> getAnalyzingGame(long userId, boolean isAnalyzing) {
        List<Game> games = gameRepository.findGamesByUserIdAndIsAnalyzingOrderByCreatedAtDesc(userId, isAnalyzing);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
