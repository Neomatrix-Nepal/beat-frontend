export const allowedExtensions = ['wav','mp3','flac','ogg','aiff','sf2','xi'];
export const allowedMimeTypes = ['audio/wav','audio/mpeg','audio/flac','audio/ogg','audio/aiff','audio/sf2','audio/x-ixi-audio-cm'];
export function isAllowedAudio(file: File): boolean {
  const ext = file.name.split('.').pop()?.toLowerCase();
  const mime = file.type;
  return !!ext && allowedExtensions.includes(ext) && allowedMimeTypes.includes(mime);
}
