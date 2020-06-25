# hasura cli
https://hasura.io/docs/1.0/graphql/manual/hasura-cli/

## dev setup

config.yaml 파일을 endpoint와 admin_secret넣어 만든다.

## first migration from server
https://hasura.io/docs/1.0/graphql/manual/migrations/basics.html

순서대로
```
hasura init hasura --endpoint https://api.parti.mx --admin-secret *****
hasura migrate create "init" --from-server --schema "mx"
hasura metadata export
hasura migrate apply --version "{version: only number}" --skip-execution
```