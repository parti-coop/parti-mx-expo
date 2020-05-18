# production 세팅

## 환경변수 세팅

firebase functions:config:set hasura.url="http://...com/" hasura.secret="..."
firebase functions:config:set hasura.url="http://hasura-load-balancer-1241189389.ap-northeast-2.elb.amazonaws.com/v1/graphql"
firebase functions:config:set hasura.secret="..."
firebase functions:config:get

## 배포

firebase deploy --only functions

### 따로 배포

firebase deploy --only functions:hasuraWebhook