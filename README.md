## 👥 Web Developers

| <img src="https://avatars.githubusercontent.com/u/127809173?v=4" width=100> | <img src="https://avatars.githubusercontent.com/u/163666284?s=96&v=4" width=100> |
| :---: | :---: |
| [유진](https://github.com/Yujin1219) | [유상완](https://github.com/wantkdd) |

### 🌐 Git-flow

- main: 프로젝트가 최종적으로 배포되는 브랜치
- feature: 기능을 개발하는 브랜치

### 📌 Git branch 규칙

- 개인 작업은 꼭 feature 브랜치에서 하기
- 모든 작업 시작 전 main에서 pull을 받은 후, feature 브랜치에서 작업 시작
- 개인 작업 마치면 feature 브랜치로 pull request를 통해 main에 merge하기

### 📝 Feature branch

- 브랜치명은 아래의 형식으로 작성합니다. (feature/이름-기능제목#이슈번호)

- 팀원 wantkdd의 브랜치명: feature/wantkdd-login#1
- Feature branch -> main branch로 merge하기 전 PR에서 reviewers 설정하여 팀원 1명에게 approve 받기

- PR 후 팀원들에게 공지하기

### 🎯 Commit Convention

- Start: Start New Project
- Feat: 새로운 기능을 추가
- Fix: 버그 수정
- Design: CSS 등 사용자 UI 디자인 변경
- Refactor: 코드 리팩토링
- Settings: Changing configuration files
- Comment: 필요한 주석 추가 및 변경
- Dependency/Plugin: Add a dependency/plugin
- Docs: 문서 수정
- Merge: Merge branches
- Deploy: Deploying stuff
- Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- Remove: 파일을 삭제하는 작업만 수행한 경우
- Revert: 전 버전으로 롤백
