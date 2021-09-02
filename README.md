# Introduction

Snaplet's Github action lets your create safe database snapshots on-demand.

# Inputs

## `docker-image-tag`

The name of the docker image tag to use. Default `"snaplet_database"`.

## Example usage

```
uses: snaplet/publish-postgres-with-data-docker-action@main
with:
  docker-image-tag: snaplet_database
```
