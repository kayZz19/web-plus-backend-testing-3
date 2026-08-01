import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      expect(postsService.findMany()).toHaveLength(4);
      expect(postsService.findMany()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "Post 1" }),
          expect.objectContaining({ text: "Post 2" }),
          expect.objectContaining({ text: "Post 3" }),
          expect.objectContaining({ text: "Post 4" }),
        ]),
      );
    });

    it("should return correct posts for skip and limit options", () => {
      const result = postsService.findMany({
        skip: 1,
        limit: 2,
      });

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        expect.objectContaining({ text: "Post 2" }),
        expect.objectContaining({ text: "Post 3" }),
      ]);
    });

    it("should return correct posts with limit option", () => {
      const result = postsService.findMany({
        limit: 2,
      });

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        expect.objectContaining({ text: "Post 1" }),
        expect.objectContaining({ text: "Post 2" }),
      ]);
    });

    it("should return correct posts with skip option", () => {
      const result = postsService.findMany({
        skip: 2,
      });

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        expect.objectContaining({ text: "Post 3" }),
        expect.objectContaining({ text: "Post 4" }),
      ]);
    });
  });
});
