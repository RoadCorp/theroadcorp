#!/bin/sh
# Lint only changed files, so old lint debt elsewhere doesn't block a task.
#   lint-changed.sh         working-tree edits and new files (the Claude Code Stop hook)
#   lint-changed.sh <base>  files changed on this branch since <base> (CI)
set -eu
if [ "$#" -gt 0 ]; then
  files=$(git diff --name-only --diff-filter=d "$1...HEAD")
else
  files=$( { git diff --name-only --diff-filter=d HEAD; git ls-files --others --exclude-standard; } | sort -u )
fi
[ -n "$files" ] || exit 0
printf '%s\n' "$files" | tr '\n' '\0' | xargs -0 biome check --no-errors-on-unmatched --files-ignore-unknown=true
