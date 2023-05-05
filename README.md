# Introduction

This action lets your restore a Snaplet snapshot into a Docker container and push it to your registry for later use.
To use it you need to create a workflow with a service container running a database. This container will be populated with data and pushed to a registry.

# Inputs

## `docker-container-name`

**required** Name of the docker container running the database.

## `docker-image-tag`

**required** A tag to apply and push the image with. Must be fully qualified including registry URL e.g. `ghcr.io/snaplet/snaplet-snapshot:latest`.

## `snaplet-database-url`

**required** A connection string to use to restore a snapshot.

## `snaplet-restore-command`

A command to run to restore a snapshot. Default `snaplet snapshot restore --latest`.

## Example usage

Apart from inputs this action expects standard Snaplet environment variables to authenticate the CLI. See example workflow in `.github/workflows/snaplet-restore.yml`.
