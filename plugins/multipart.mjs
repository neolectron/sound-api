import plugin from 'fastify-plugin';
import multipart from 'fastify-multipart';

export default plugin(multipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    // fieldSize: 1000000, // Max field value size in bytes
    fields: 10, // Max number of non-file fields
    // fileSize: 100,      // For multipart forms, the max file size
    files: 1, // Max number of file fields
    // headerPairs: 2000   // Max number of header key=>value pairs
  },
});
