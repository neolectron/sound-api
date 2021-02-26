import { createWriteStream } from 'fs';
import { readdir, rm } from 'fs/promises';
import FileType from 'file-type';
import { join } from 'path';

const soundRoute = async (fastify, options) => {
  const { UnsupportedMediaType, NotFound } = fastify.httpErr;
  const { DATA_FOLDER } = process.env;

  // get host with req.get('host') to send absolute web urls.

  fastify.get('/', async (req, reply) => {
    return readdir(DATA_FOLDER);
  });

  fastify.post('/', async (req, reply) => {
    const { file, fields } = await req.file();
    const fileStream = await FileType.stream(file);

    if (
      fileStream.fileType?.ext !== 'flac' ||
      fileStream.fileType?.mime !== 'audio/x-flac'
    ) {
      return UnsupportedMediaType();
    }

    const url = new URL(fields.youtubeInput.value);
    const name = url.searchParams.get('v');
    const destination = join(DATA_FOLDER, `${name}.flac`);

    const writeStream = createWriteStream(destination);
    fileStream.pipe(writeStream);

    reply.code(201);
    return { destination };
  });

  fastify.delete('/:id', async (req, reply) => {
    const dir = await readdir(DATA_FOLDER);

    if (!dir.includes(`${req.params.id}.flac`)) {
      return NotFound();
    }

    reply.code(204);
    return rm(join(DATA_FOLDER, `${req.params.id}.flac`));
  });
};

export default soundRoute;