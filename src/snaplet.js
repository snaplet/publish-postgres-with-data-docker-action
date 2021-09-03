const { spawnSync } = require('child_process')

const core = require('@actions/core')

async function main() {
    const dockerContainerRegistryServer = core.getInput('docker-container-registry-server', { required: false }) // Default ghcr.io
    const dockerContainerRegistryUser = core.getInput('docker-container-registry-user', { required: true })
    const dockerImageName = core.getInput('docker-image-name', { required: false }) // Default snaplet_database from action.yml

    const restoreCmd = spawnSync('snaplet', ['restore', '--no-backup', '--new'], {
        encoding: 'utf-8'
    })
    core.info('Info: snaplet restore output ' + restoreCmd.stdout + '\n' + restoreCmd.stderr)

    const cleanUpExistingDataCmd = spawnSync('rm', ['-rf', './data'], {
        encoding: 'utf-8'
    })
    core.info('Info: clean up output ' + cleanUpExistingDataCmd.stdout + '\n' + cleanUpExistingDataCmd.stderr)

    // TODO: evaluate if this (https://github.com/apocas/dockerode) is better than docker + exaca

    const postgresContainerNameCmd = spawnSync('docker', ['ps', '--format', "'{{.Names}}'"], {
        encoding: 'utf-8'
    })

    const postgresContainerName = postgresContainerNameCmd.stdout.replace("'", '').replace("'", '').trim()
    core.info('Info: postgres container name ' + postgresContainerName)

    const copyDockerDataCmd = spawnSync('docker', ['cp', `${postgresContainerName}:/var/lib/postgresql/data`, './data'], {
        encoding: 'utf-8'
    })
    core.info('Info: copy docker data ' + copyDockerDataCmd.stdout + '\n' + copyDockerDataCmd.stderr)

    const dockerBuildCmd = spawnSync('docker', ['build', '-t', `${dockerImageName}`, './src'], {
        encoding: 'utf-8'
    })
    core.info('Info: docker build ' + dockerBuildCmd.stdout + '\n' + dockerBuildCmd.stderr)

    const dockerTagCmd = spawnSync('docker', ['tag', `${dockerImageName}`, `${dockerContainerRegistryServer}/${dockerContainerRegistryUser}/${dockerImageName}:latest`], {
        encoding: 'utf-8'
    })
    core.info('Info: docker tag ' + dockerTagCmd.stdout + '\n' + dockerTagCmd.stderr)

    const dockerPush = spawnSync('docker', ['push', `${dockerContainerRegistryServer}/${dockerContainerRegistryUser}/${dockerImageName}:latest`], {
        encoding: 'utf-8'
    })
    core.info('Info: docker push ' + dockerPush.stdout + '\n' + dockerPush.stderr)
}

main().catch(e => {
    core.error(e)
    process.exit(1)
})
