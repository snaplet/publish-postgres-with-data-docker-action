# Introduction

Snaplet's Github action lets your create safe database snapshots on-demand.

# Inputs

## `docker-image-tag`

The name of the docker image tag to use. Default `"snaplet_database"`.

## Example usage

```
uses: snaplet/publish-postgres-with-data-docker-action@main
with:
  docker-container-registry-user: <docker-registry-user>
  docker-image-tag: <docker-image-tag>
env:
  SNAPLET_ACCESS_TOKEN: ${{ secrets.SNAPLET_ACCESS_TOKEN }}
  SNAPLET_DATABASE_ID: <snaplet-database-id>
  PGHOST: localhost
  PGUSER: postgres
  PGPASSWORD: postgres
  PGPORT: 5432
  PGDATABASE: <restore-database-name>
```
