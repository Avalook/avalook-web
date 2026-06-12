// Shared helper: does a media URL point at a video file? Used to decide whether
// to render <video> vs <img> for fields (e.g. a project Image that an editor
// uploaded a clip into).
export const isVideoUrl = (src: string): boolean => /\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i.test(src);
