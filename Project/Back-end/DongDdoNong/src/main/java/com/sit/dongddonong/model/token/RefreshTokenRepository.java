package com.sit.dongddonong.model.token;

import com.sit.dongddonong.model.token.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken,String> {
}
