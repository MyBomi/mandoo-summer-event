# 저주받은 별장 — 방탈출 이벤트 사이트

친구들과 하는 미니 이벤트용 공포 방탈출 웹사이트. 5~8팀, 4단계, Firebase로 진행 상황을 실시간 모니터링할 수 있음.

## 파일 구성
- `index.html` — 참가자용 방탈출 페이지 (팀별로 링크만 다르게 공유)
- `monitor.html` — 진행자 전용 실시간 모니터링 페이지 (참가자에게 공유하지 말 것)

## 1. 내용 커스터마이징
`index.html`을 열어서 상단 `const CONFIG = {...}` 부분을 수정:
- `teams`: 실제 팀 이름 목록
- `stage2Answer`, `stage4Answer`: 코드 정답 (원하는 숫자로 변경)
- `stage3Order`: 3단계 클릭 순서 (`bat`/`key`/`skull`/`web`/`candle` 중 조합)
- 스토리 문구는 각 `<section>`의 `<p>` 텍스트를 직접 수정하면 됨

## 2. Firebase 설정 (모니터링 원할 때만, 선택사항)
설정 안 해도 방탈출 자체는 정상 작동함. 진행자가 실시간으로 팀 진행 상황을 보고 싶을 때만 진행:

1. https://console.firebase.google.com 접속 → "프로젝트 추가" → 이름 아무거나 입력 (예: horror-event) → Google 애널리틱스는 꺼도 됨
2. 왼쪽 메뉴에서 **빌드 → Realtime Database → 데이터베이스 만들기**
   - 위치는 아무거나, 보안 규칙은 **테스트 모드로 시작** 선택 (친구들끼리 하는 일회성 이벤트라 괜찮음)
3. 프로젝트 개요 옆 **⚙️ → 프로젝트 설정 → 내 앱 → 웹 앱 추가(</> 아이콘)**
4. 앱 닉네임만 입력하고 등록하면 `firebaseConfig` 객체가 나옴 (apiKey, authDomain, databaseURL, projectId 등)
5. 이 값을 **`index.html`과 `monitor.html` 양쪽 모두**의 `CONFIG.firebase` 자리에 그대로 붙여넣기 (두 파일 값이 같아야 함)

## 3. GitHub Pages로 배포
1. https://github.com/new 에서 새 저장소 생성 (Public)
2. 이 폴더의 `index.html`, `monitor.html`을 저장소에 업로드
   - 터미널 쓸 수 있으면: `git init && git remote add origin <저장소주소> && git add . && git commit -m "init" && git push -u origin main`
   - 터미널 안 써도 됨: 저장소 페이지에서 **Add file → Upload files**로 드래그 앤 드롭
3. 저장소 **Settings → Pages → Source**를 `Deploy from a branch`, Branch를 `main` / `(root)`로 설정 후 Save
4. 1~2분 후 `https://아이디.github.io/저장소명/` 접속해서 확인

## 4. 팀별 링크 공유
팀 구분은 URL 뒤에 `?team=팀이름`을 붙이는 방식:
```
https://아이디.github.io/저장소명/?team=A
https://아이디.github.io/저장소명/?team=B
```
이 파라미터 없이 접속하면 팀을 직접 고르는 화면이 뜨니, 그냥 기본 링크 하나만 공유해도 됨.

진행자는 본인만:
```
https://아이디.github.io/저장소명/monitor.html
```
을 열어서 실시간 진행 상황을 확인.

## 참고
- Firebase 무료(Spark) 플랜은 동시 접속 100개까지 무료라 20명 규모엔 충분함
- 미리보기(artifact) 화면에서는 Firebase 연결이 제한될 수 있으니, 실제 테스트는 GitHub Pages에 배포한 뒤 진행 권장
