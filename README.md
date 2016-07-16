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

#### MongoDb configuration
````
 MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: ********
   Database Name: image

 Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
````

#### remote git:
 ssh://5766b0f50c1e6601a800014e@image-oic.rhcloud.com/~/git/image.git/

#### watch using space memory
 $rhc show-app image --gears quota

#### port forwarding (use remote database on local computer)
 $rhc port-forward image
 
#### root directory
 /var/lib/openshift/5766b0f50c1e6601a800014e
 
#### set DEV/PROD mode
 export NODE_ENV=production (or development)