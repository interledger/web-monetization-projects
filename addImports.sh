#!/bin/zsh

# enable globstar
setopt EXTENDED_GLOB
setopt NO_NOMATCH

importLine="import {jest, beforeEach, afterEach, afterAll, expect, test, describe, it, beforeAll} from '@jest/globals';"

for file in packages/*/{src,test}/**/*.test.{mts,ts}; do
  if [ -f "$file" ]; then
    echo "Processing $file"
    printf "%s\n%s" "$importLine" "$(cat $file)" > "$file"
  fi
done
