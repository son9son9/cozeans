## [Cozeans] 외국 의류 브랜드 컨셉의 쇼핑몰 사이트

### [프로젝트 링크 바로가기](https://son9son9.github.io/cozeans/)

\*현재는 Desktop UI만 지원합니다.

---

### 기획 과정

[Figma](https://www.figma.com/file/MNikfDmMLnlA5feq2UEz8C/cozeans?type=design&node-id=0%3A1&mode=design&t=veY0grOAcf5jlIRI-1)로 전체적인 디자인, 플로우, 프로토타입을 작성했습니다.

---

### 주요 기능

- 프로덕트 레벨의 UI 디자인
- 쇼핑몰에 필요한 회원, 장바구니, 결제 시스템 구현
- 토스페이먼츠 결제 API를 이용한 모의 결제 시스템

---

### 개발환경 및 업데이트 내역

v1 (2024.06)

- **React.js + Vite** 환경에서 제작하였습니다.
- 순수 **JavaScript** 만을 사용하여 상태관리툴 또는 기타 라이브러리 없이 모든 기능을 구현하였습니다.
- **SCSS + CSS Module** 을 활용하여 CSS 코드를 최적화하고 코드 가독성을 높였습니다.
- Serverless 디자인으로 백엔드 서버 구축 없이 **JS의 내장 기능(localStorage, sessionStorage)** 만을 사용하여 로그인, 장바구니, 결제 등의 기능을 구현하였습니다.
- 토스페이먼츠 결제 모듈을 삽입하여 테스트 결제 기능을 구현했습니다.
- **GitHub Pages + GitHub Actions** 를 사용하여 유지보수 시 자동 배포됩니다.

v2 (2024.09)  
주요 변경점 : 내부 로직 변경 및 원격 서버 구축

- **TypeScript**로 마이그레이션 했습니다.
- **Tanstack Query(구 React Query)** 를 추가하여 서버 데이터를 관리하록 변경했습니다.
- **Redux Toolkit, Redux Pesist** 도입하여 상태 관리를 효율적으로 할 수 있도록 변경했습니다.
- **AWS EC2 인스턴스**로 **Node.js(Express)** 서버를 구축하고, **MongoDB**로 DB를 관리합니다.

---

### 🎯 트러블 슈팅

#### HTML / CSS / JS

[가로로 무한히 흐르는 텍스트 전광판 구현](https://rigorous-wandflower-6ee.notion.site/28feddd3ef6f4cc5a3dd4cc3572233f2)  
[localStorage와 state의 동기화](https://rigorous-wandflower-6ee.notion.site/localStorage-state-b55d65fea8d142129201d62d39c69e37)

#### TypeScript

[JS 프로젝트를 TS로 마이그레이션 하기](https://rigorous-wandflower-6ee.notion.site/JS-TS-131ceac030dc80819b2ff8cb124547cc)

#### React.js

[React의 구체적인 렌더링 구조와 순서](https://rigorous-wandflower-6ee.notion.site/React-337b626d43a34c3c9c7f4736bc26b266)  
[React useState 배열 객체 값 변경하기](https://rigorous-wandflower-6ee.notion.site/React-useState-9bfcfbc63ba14033a2ee9165470b6abe)

#### Redux

[Redux-toolkit 도입하고 마이그레이션하기](https://rigorous-wandflower-6ee.notion.site/Redux-toolkit-131ceac030dc8038a25af2f2bbd8a204)  
[Redux-Persist 도입하기](https://rigorous-wandflower-6ee.notion.site/Redux-Persist-131ceac030dc80fa8e2df31d0b364273)

#### Node.js

[[MongoDB, Node.js] find() 호출 시 데이터 반환 오류](https://rigorous-wandflower-6ee.notion.site/MongoDB-Node-js-find-131ceac030dc80f19298e62ac29e42e8)  
[[Express] req.body에 값이 들어오지 않는 오류](https://rigorous-wandflower-6ee.notion.site/Express-req-body-131ceac030dc80b48b78f23762e50b18)  
[Node.js에서 fetch 사용하기](https://rigorous-wandflower-6ee.notion.site/Node-js-fetch-131ceac030dc80a385e4f9a9388ca23a)

#### MongoDB

[MongoDB 보안 해킹](https://rigorous-wandflower-6ee.notion.site/MongoDB-131ceac030dc8004a8cff4dfb77c5183)  
[MongoDB 사용자 개념](https://rigorous-wandflower-6ee.notion.site/MongoDB-131ceac030dc8007b5b6fd4eb0df9a9c)  
[[MongoDB] 컬렉션의 최신 데이터 조회 후 해당 데이터 update하기](https://rigorous-wandflower-6ee.notion.site/MongoDB-update-131ceac030dc80a58f9bd8302ae04da0)

#### AWS EC2

[키페어 미생성 SSH 접속 제한](https://rigorous-wandflower-6ee.notion.site/SSH-131ceac030dc80c1ac8ef738b9038593)  
[SSH 연결 종료 시 외부 서버가 종료되는 현상](https://rigorous-wandflower-6ee.notion.site/SSH-131ceac030dc8067983ac3d36cf8cf61)  
[Mixed Content 에러 해결 (ngrok)](https://www.notion.so/Mixed-Content-ngrok-13dceac030dc80fcb3d9f2d2fbdedec3)  
[ngrok 백그라운드에서 실행하기](https://www.notion.so/ngrok-153ceac030dc80019b44c84d6b2e3dfb)

---

#### 참고 및 출처

이미지 출처 :  
https://www.calvinklein.co.kr/ko/home/  
https://hififnk.kr/

COPYRIGHT © son9son9 ALL RIGHTS RESERVED.
