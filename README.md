# image-pro

### build native library
 run native/compile_x.sh
 it will output file web/bin/myLib.so

### install NodeJS
 $cd ./web
 $npm install
 $bower install --save

### run on localhost:3000
 $cd ./web
 $node ./bin/www

### deploy to openshift.redhat.com
 $git add * 
 $git commit & push
  
#### if have any error, try to log:
 $rhc ssh -a image
 $tail app-root/logs/nodejs.log