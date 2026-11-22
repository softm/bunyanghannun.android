# 청약한눈 Android

`bunyanghannun` PWA를 표시하고 관심조건에 맞는 신규 공고·접수 마감을 기기 안에서 확인하는 한눈서비스 Android 앱입니다.

## 구성

- SDK: `compileSdk 36`, `targetSdk 36`, `minSdk 24`
- 패키지: `net.softm.bunyanghannun`
- 운영 URL: `https://softm.github.io/bunyanghannun/`
- 시작 시 문서·정적 자산 1회 재검증 후 기본 캐시 정책 복귀
- 메인 문서 네트워크/HTTP 오류 시 공통 실패 화면과 48dp 재시도 버튼
- WorkManager 6시간 주기, 관심조건과 공식 JSON을 기기 안에서 비교
- `hannun-admob-android` 및 `hannun-in-app-update-android` 공통 모듈 사용
- 운영 AdMob ID는 앱·지면 전용 ID 발급 전까지 비활성, Debug만 Google 테스트 ID 사용
- 빌드 전 형제 저장소 `../bunyanghannun/public`을 오프라인 assets로 동기화

## 로컬 검증

```bash
./gradlew testDebugUnitTest assembleDebug
```

Release 서명은 저장소 밖의 환경변수 `ANDROID_KEYSTORE_PATH`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`로만 주입합니다. 배포 판단 전에는 공통 `softm.keystore.jks` 인증서를 확인하고 실제 서명된 Release를 기기 또는 에뮬레이터에서 별도로 검증해야 합니다.
