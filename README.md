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

#### remote git:
ssh://5766b0f50c1e6601a800014e@image-oic.rhcloud.com/~/git/image.git/

#### watch using space memory
 rhc show-app image --gears quota