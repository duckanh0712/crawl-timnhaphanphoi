#!/usr/bin/env groovy

node {
    properties([disableConcurrentBuilds()])

    try {

        stage ("checkout code"){
            sh "git checkout ${env.BRANCH_NAME} && git reset --hard origin/${env.BRANCH_NAME}"

        }
        stage ("pull code"){

            sh "git pull origin ${env.BRANCH_NAME}"
        }
        stage ("pull code"){

            sh "pm2 restart prod-start.sh"
        }

    } catch (e) {
      
        throw e
    }
}
