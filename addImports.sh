#!/bin/zsh

importLine="import {expect, test, describe, it, should, beforeAll} from '@jest/globals';\n"

for file in packages/*/{src,test}/**/*.{mts,ts}; do
  if [ -f "$file" ]; then
    echo "Processing $file"
    echo -e "$importLine$(cat $file)" > $file
  fi
done
