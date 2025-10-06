#!/bin/sh
cd "$(dirname "$0")"
find website -maxdepth 2 -name "index.html" | sed 's|^website/||; s|/index.html$||' > weblist.txt