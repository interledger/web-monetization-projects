#!/bin/zsh

find_ts_files() {
  find src -type f -name '*.ts'
}

for file in $(find_ts_files); do
  echo "----- $file -----"
  awk '{ print "  " $0 }' $file
done
