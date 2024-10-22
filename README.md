## Cozeans

### 외국 의류 브랜드 컨셉의 쇼핑몰 사이트

---

### 기획 과정

**Figma**로 전체적인 디자인, 플로우, 프로토타입을 작성했습니다.

[Figma 링크](https://www.figma.com/file/MNikfDmMLnlA5feq2UEz8C/cozeans?type=design&node-id=0%3A1&mode=design&t=veY0grOAcf5jlIRI-1)

---

### 개발환경 및 업데이트 현황

v1 (2024.06)

- **React.js + Vite** 환경에서 제작하였습니다.
- 순수 **JavaScript** 만을 사용하여 상태관리툴 또는 기타 라이브러리 없이 모든 기능을 구현하였습니다.
- **SCSS + CSS Module** 을 활용하여 CSS 코드를 최적화하고 코드 가독성을 높였습니다.
- Serverless 디자인으로 백엔드 서버 구축 없이 **JS의 내장 기능(localStorage, sessionStorage)** 만을 사용하여 로그인, 장바구니, 결제 등의 기능을 구현하였습니다.
- 토스페이먼츠 결제 모듈을 삽입하여 테스트 결제 기능을 구현했습니다.
- **GitHub Pages + GitHub Actions** 를 통해 배포하여 유지보수 시 자동 배포됩니다.

v2가 업데이트 되었습니다.(2024.09)

- **TypeScript**로 마이그레이션 했습니다.
- **Tanstack Query(구 React Query)** 를 추가하여 서버 통신 로직을 구현했습니다.
- **Redux Toolkit, Redux Pesist** 도입하여 상태 관리를 안정적으로 할 수 있도록 변경했습니다.
- **AWS EC2 인스턴스**로 **Node.js(Express)** 서버를 구축, **MongoDB**로 DB를 관리하도록 추가했습니다.

---

### [프로젝트 링크 바로가기](https://son9son9.github.io/cozeans/)

\*현재는 Desktop UI만 지원합니다.

---
