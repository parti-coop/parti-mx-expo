![](/assets/favicon2/android-icon-192x192.png)
# Parti Mx (빠띠 믹스) 

## 설치

### CLI

1. github에서 `git clone git@github.com:parti-coop/parti-mx.git`
2. yarn install
3. npm i expo-cli -g

### simulator

* 아이폰은 mac에서 xcode 설치
* 안드로이드는 android studio 설치


### vscode extensions

1. Apollo GraphQL
2. prettier

### 실행

`yarn start`
* i 타이핑 하면 아이폰 자동 설치 및 실행
* a 는 안드로이드

## 배포

### prerequisite

* auth는 firebase auth 사용. (/src/firebaseConfig.ts 로컬에 따로 세팅 필요)
* postgres & hasura 세팅 필요
* hasura와 firebase auth 연결 위해 jwt 연결 (`/functions/package.json` 참조)

### deploy to store

> don't forget to upgrade versions before deployment!
* [build standalone](https://docs.expo.io/distribution/building-standalone-apps/)
* [upload to stores](https://docs.expo.io/distribution/uploading-apps/)

## 구조

### expo directory

* src/screen 내부에 모든 화면 등록

### state management

* top level minimum useReducer `/src/Store.tsx`
* graphql로 대부분 실시간 subscriptions
* redux 필요 없고 hooks만 있으면 된다. [아티클](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)

