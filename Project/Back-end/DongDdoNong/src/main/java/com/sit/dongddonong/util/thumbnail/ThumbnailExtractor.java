package com.sit.dongddonong.util.thumbnail;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.util.FileUtil;
import org.jcodec.api.FrameGrab;
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
public class ThumbnailExtractor {

    private static final String EXTENSION = "png";

//    private static final String DEFAULT_IMAGE_PATH = "src/main/resources/static/images/default-thumbnail.png";

    public static File extract(File source) throws IOException {
        // 썸네일 파일 생성
//        File thumbnail = new File(source.getParent(), source.getName().split("\\.")[0] + "." + EXTENSION);
        File thumbnail = new File(UUID.randomUUID() + "." + EXTENSION);
        try {
            if (!source.exists()) {
                System.out.println("파일이 존재하지 않습니다.");
            }

            FrameGrab frameGrab = FrameGrab.createFrameGrab(NIOUtils.readableChannel(source));

            // 첫 프레임의 데이터
            frameGrab.seekToSecondPrecise(0);

            Picture picture = frameGrab.getNativeFrame();

            // 썸네일 파일에 복사
            BufferedImage bi = AWTUtil.toBufferedImage(picture);
            ImageIO.write(bi, EXTENSION, thumbnail);

        } catch (Exception e) {
            // 실패했을 경우에 기본 이미지를 사용

            ClassLoader classLoader = ThumbnailExtractor.class.getClassLoader();
            File defaultImage = new File(classLoader.getResource("static/images/default-thumbnail.png").getFile());

            try {
                FileUtil.copyFile(defaultImage, thumbnail);
            } catch (Exception ex) {
                log.info("Thumbnail Extract Failed => {}", source.getPath(), e);
            }
        }

        return thumbnail;
    }
}