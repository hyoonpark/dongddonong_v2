package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.upload.UploadRequestDto;
import com.sit.dongddonong.model.game.Game;
import com.sit.dongddonong.model.game.GameRepository;
import com.sit.dongddonong.util.thumbnail.ThumbnailExtractor;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UploadService {

    private final S3Client s3Client;
    private final GameRepository gameRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
//    public String upload(MultipartFile multipartFile, String dirName, String fileUniqueName) throws IOException {
//        File uploadFile = convert(multipartFile)
//                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
//        return upload(uploadFile, dirName, fileUniqueName);
//    }

    private String upload(File uploadFile, String dirName, String fileUniqueName) {
//        String fileName = dirName + "/" + uploadFile.getName();
        String fileName = dirName + "/" + fileUniqueName + "_" + uploadFile.getName();
        String uploadUrl = putS3(uploadFile, fileName);

        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)

        return uploadUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }
    private void removeNewFile(File targetFile) {
        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws  IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    private String putS3(File uploadFile, String fileName) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(fileName)
                .acl(ObjectCannedACL.BUCKET_OWNER_FULL_CONTROL)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromFile(uploadFile));
        return String.valueOf(s3Client.utilities().getUrl(GetUrlRequest.builder().bucket(bucket).key(fileName).build()));
    }
    @Transactional
    public long saveFileAndCreateGame(UploadRequestDto uploadRequestDto) throws Exception {
        File uploadFile = convert(uploadRequestDto.getFile())
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        File thumbnailFile = ThumbnailExtractor.extract(uploadFile);

        String thumbnail = (upload(thumbnailFile, "thumbnail", String.valueOf(UUID.randomUUID())));
        long gameId = createGame(uploadRequestDto, thumbnail);

        upload(uploadFile, "video", String.valueOf(gameId));

        return gameId;
    }

    public long createGame(UploadRequestDto uploadRequestDto, String thumbNail) {
        Game game = gameRepository.save(Game.createGame(uploadRequestDto, thumbNail));
        return game.getId();
    }

}
