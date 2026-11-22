# 분양알람 Android

`bunyangalarm` 웹앱을 감싸는 한눈서비스 Android 셸입니다. 공통 AdMob과 인앱 업데이트 라이브러리를 사용하며, 웹 소스는 빌드 전에 `../bunyangalarm/public`에서 앱 assets로 동기화됩니다.

- SDK: compile/target 36, min 24
- 운영 URL: `https://softm.github.io/bunyangalarm/`
- 운영 광고 ID가 발급되기 전까지 모든 운영 광고 지면 비활성
- Release 서명은 `signing.properties`에서 공통 `softm.keystore.jks`를 외부 참조

```bash
./gradlew test assembleDebug
```
