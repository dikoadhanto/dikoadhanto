pipeline {
    agent { docker { image 'node:16.17.1-alpine' } }
    stages {
        stage('build') {
            steps {
		System.setProperty("org.jenkinsci.plugins.durabletask.BourneShellScript.FORCE_BINARY_WRAPPER", "true");
                sh 'node --version'
            }
        }
    }
}
