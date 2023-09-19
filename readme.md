# 공통 프로젝트

SSAFY 9기 부울경 1반 특화프로젝트 E103

## 🙋🏻‍♂️ Members

양불회
강다은
이동주
김지홍
방정우
박하윤

## 📌 Convention


###  1️⃣ Project Convention

프로젝트 구조

#### Front-end
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂img
 ┃ ┃ ┣ 📜Games.png
 ┃ ┃ ┣ 📜image.png
 ┃ ┃ ┣ 📜kakao_login_btn.png
 ┃ ┃ ┣ 📜player.png
 ┃ ┃ ┣ 📜player2.jpg
 ┃ ┃ ┣ 📜player3.jpg
 ┃ ┃ ┗ 📜Profile.png
 ┣ 📂components
 ┃ ┣ 📂Chart
 ┃ ┃ ┣ 📜Chart.js
 ┃ ┃ ┣ 📜HalfChart.js
 ┃ ┃ ┗ 📜LineChart.js
 ┃ ┗ 📂UI
 ┃ ┃ ┣ 📜Button.js
 ┃ ┃ ┣ 📜Card.js
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜Navbar.js
 ┃ ┃ ┗ 📜Wrapper.js
 ┣ 📂pages
 ┃ ┣ 📂Game
 ┃ ┃ ┗ 📜GamePage.js
 ┃ ┃ ┣ 📜Calendar.js
 ┃ ┣ 📂Home
 ┃ ┃ ┣ 📜HomePage.js
 ┃ ┃ ┗ 📜HomePage.module.css
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜KakaoLoginPage.js
 ┃ ┃ ┣ 📜CallbackKakao.js
 ┃ ┃ ┣ 📜LoginLoading.js
 ┃ ┃ ┗ 📜LoginModal.js
 ┃ ┗ 📂Recordroom
 ┃ ┃ ┣ 📜RecordroomPage.js
 ┃ ┃ ┗ 📜RecordroomPage.module.css
 ┣ 📜App.js
 ┣ 📜index.css
 ┗ 📜index.js

 1. components와 pages로 관리
 2. components폴더에는 재사용이 가능한 요소들을 기능별 폴더로 관리
 3. pages폴더에는 페이지별로 폴더를 두고, 각 폴더는 해당페이지에서만 사용하는 컴포넌트를 관리
```

#### Back-end
```
```

### 2️⃣ Commit Convention

1. 제목은 최대 50글자까지 아래에 작성: ex) Feat: Add Key mapping
2. 제목 첫 글자를 대문자로  
3. 제목은 명령문으로  
4. 제목 끝에 마침표(.) 금지  
5. 제목과 본문을 한 줄 띄워 분리하기  
6. 본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.  
7. 본문에 여러줄의 메시지를 작성할 땐 "-"로 구분  

|Type|설명|
| -- | -- |
|Feat|새로운 기능 추가|
|Fix|버그 수정 또는 typo|
|Refactor|리팩토링|
|Design|CSS 등 사용자 UI 디자인 변경|
|Comment|필요한 주석 추가 및 변경|
|Style|코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우|
|Docs|문서 수정 (문서 추가, 수정, 삭제, README)|
|Test|테스트(테스트 코드 추가, 수정, 삭제, 비즈니스 로직에 변경이 없는 경우)|
|Chore|위에 걸리지 않는 기타 변경사항(빌드 스크립트 수정, assets image, 패키지 매니저 등)|
|Init|프로젝트 초기 생성|
|Rename|파일 혹은 폴더명 수정하거나 옮기는 경우|
|Remove|파일을 삭제하는 작업만 수행하는 경우|

### 3️⃣ Branch Convention

### Main Branch

공동 Repo에 필수로 존재해야 하는 브랜치입니다.

1. master(main) branch
    - 제품으로 출시될 수 있는 브랜치입니다.
    - 사용자에게 배포 가능한 상태만 관리합니다.
    - `main`
2. develop branch
    - 다음 출시 버전을 개발하는 브랜치입니다. (평소 개발하는 브랜치라고 생각하시면 됩니다.)
    - 기능 개발을 위한 브랜치들을 병합하기 위해 사용합니다.
    - 모든 기능이 추가되고 버그가 수정되어 배포 가능한 상태가 되면 develop branch를 master branch에 merge합니다.
    - **배포가 가능한 안정적인 상태가 아니라면** master branch를  건들이지 않습니다. ~~(건들이면 물어요)~~
    - `develop`

### Sub Branch

기능 개발, 에러 처리를 위해 사용되는 브랜치입니다. Main Branch들보다 상대적으로 생명이 짧습니다.

1. feature branch
    - 기능을 개발하는 브랜치입니다.
    - 새로운 기능을 및 버그 수정이 필요할 때마다 develop branch로부터 분기합니다.
    - 이 브랜치는 공유할 필요가 없으므로 자신의 로컬저장소에서 관리합니다.
    - 개발이 완료되면 develop branch로 merge하여 다른사람과 공유합니다.
    - 기능 개발을 할 시 동일한 기능을 개발하지 않도록 **커뮤니케이션 하는 것이 중요**합니다.
    - `feature/{postion}/{issue-number}-{feature-name}` 이슈 추척 사용 시 ex) feature/BE/6-login, ex2) feature/FE/7-login
2. release branch
    - 출시 버전을 준비하는 브랜치입니다.
    - 이 브랜치는 develop branch로부터 분기합니다.
    - 배포를 위한 최종적인 버그 수정, 문서 추가 등 배포와 직접적으로 관련된 작업을 수행합니다.
    - `release-배포 버전` ex)release-1.0 , release-1.2
3. hotfix branch
    - 출시 버전에서 발생한 버그를 수정하는 브랜치입니다.
    - 이 브랜치는 master branch에서 분기합니다.
    - 버그 수정만을 위한 브랜치이므로 개발하던 내용에 영향을 주지 않습니다.
    - `hotfix-버그가 발생한 배포 버전.n`  ex)hotfix-1.0.1, hotfix-1.2.0

  
### 브랜치 생성 명령어

- 현재 위치에서 새로운 브랜치 생성
    
    ```bash
    git branch new_branch_name
    ```
    
- 브랜치 생성과 동시에 이동하기
    
    ```bash
    git checkout -b new_branch_name
    ```
    

### 브랜치 삭제 명령어

- 브랜치 삭제
    
    ```bash
    git branch -d branch_name
    ```
    
- 병합하지 않은 브랜치 강제 삭제
    
    ```bash
    git branch -D branch_name
    ```
    
- 원격 브랜치 삭제
    
    ```bash
    git push --delete 원격_Repo_별칭 원격_branch_name
    
    ex) git push --delete origin test
    ```
    

### 브랜치 이름 변경 명령어

- 이름 변경

    ```bash
    git branch -m origin_branch_name new_branch_name
    ```
