serverless-install:
	npm install --silent --progress=false -g npm
	npm install --silent --progress=false -g serverless

serverless-deploy:
	serverless --host=ci --stage=${STAGE} deploy

deploy: serverless-install serverless-deploy

.DEFAULT_GOAL := deploy
