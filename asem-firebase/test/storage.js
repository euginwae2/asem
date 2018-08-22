'use strict'
var Storage = require('@google-cloud/storage');
var Path =  require('path');


/**
 * Test upload
 */
let file = Path.join(__dirname,'tiepolo11.jpg');
upload(file,'asem-storage');

//console.log(Path.join(__dirname,'tiepolo11.jpg'));



function allBuckets()
{
  const projectId = 'asem-storage';
  const storage = new Storage({
      projectId: projectId,
    });

    storage
      .getBuckets()
      .then(results => {
        console.log(results);
      });
}


function upload (filepath, bucketName)
{
  const storage = new Storage({
    projectId: 'asem-storage'});
  storage
    .bucket(bucketName)
    .upload(filepath)
    .then(() => {
      console.log('${filepath} uploaded to ${bucketName}.');
    })
    .catch(err => {
      console.error('Error: ', err);
    })
}