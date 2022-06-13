#!/bin/bash
for file in src/js/*.js; do
    filename=$(basename "$file")
    uglifyjs "$file" -c -m  -o "dist/js/$filename" 
    echo minified: "$file" 
done 