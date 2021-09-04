yarn init -y
yarn add express
yarn add typescript -D
yarn tsc --init
yarn add @types/express -D
yarn add ts-node-dev -D
yarn add eslint -D
yarn eslint --init
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
yarn add uuid
yarn add date-fns
yarn add typeorm pg
yarn add reflect-metadata
yarn add bcryptjs
yarn add jsonwebtoken




TYPEORM
create migration
  yarn typeorm migration:create -n CreateAppointments

run migration
yarn typeorm migration:run
