import { GridFSBucket } from 'mongodb';
import clientPromise from '.';

let bucket: GridFSBucket | null = null;

export async function getGridFSBucket() {
    if (!bucket) {
        const client = await clientPromise;
        const db = client.db('nexsol');
        bucket = new GridFSBucket(db, {
            bucketName: 'files',
        });
    }
    return bucket;
}