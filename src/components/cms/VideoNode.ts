// Minimal block-level <video> node for TipTap so writers can embed an uploaded
// video in a post body. Renders a native <video controls>; the public site
// prints the same markup (RichText renders the HTML verbatim).

import { Node } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /** Insert a video block with the given source URL. */
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

export const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return { src: { default: null } };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", { controls: "true", class: "post-inline-video", ...HTMLAttributes }];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: options }),
    };
  },
});
