# Introduction

Snaplet's Github action lets your create safe database snapshots on-demand.

# Inputs

## `docker-image-tag`

**required** A tag to apply and push the image with. Must be fully qualified including registry URL e.g. `ghcr.io/snaplet/snaplet-snapshot:latest`.

## `snaplet-database-url`

**required** A connection string to database instance. You have to have a container running as a service, see example workflow in `.github/workflows/snaplet-restore.yml`.

## `snaplet-restore-command`

A command to run to restore a snapshot. Default `snaplet snapshot restore --latest`.

## Example usage

Apart from inputs this action expects standard Snaplet environment variables to authenticate the CLI. See example workflow in `.github/workflows/snaplet-restore.yml`.
