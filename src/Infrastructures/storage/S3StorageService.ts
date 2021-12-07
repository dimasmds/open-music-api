import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import StorageService, { FileParameter } from '../../Applications/storage/StorageService';
import config from '../../Commons/config';

class S3StorageService implements StorageService {
  private s3: S3;

  constructor() {
    this.s3 = new S3();
  }

  async writeFile(file: FileParameter): Promise<string> {
    const { file: readableFile, meta: { filename, contentType } } = file;
    const params: PutObjectRequest = {
      Bucket: config.s3.bucketName,
      Key: filename,
      Body: readableFile,
      ContentType: contentType,
    };
    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
}

export default S3StorageService;
