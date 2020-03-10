# production 세팅

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."

## 배포

firebase deploy --only functions
