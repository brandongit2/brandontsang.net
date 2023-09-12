this is the repository for my AWESOME website at https://www.brandontsang.net.

everything is still a work in progress, although at this point close to 95% of the site is done.

### task summary:

- [x] name glsl masthead
  - [x] generate SDF and MSDF textures
  - [x] wave effect
  - [x] perf optimization
- [x] layout
  - [x] nav section blur effect
- [ ] content
  - [x] main page
  - [x] sprintzero page
  - [ ] hemlane page (todo: finish writing up mobile layout text)
- [ ] video encoding (av1, hevc, vp9)
  - hemlane page videos complete, sprintzero demo videos are from a previous try at encoding and quality is poor
- [ ] SEO
- [ ] other polish!!!
  - [ ] bundle size reduction (have made some components lazy-load, but need to do more to that end)
  - [ ] fix layout shift
  - [ ] name masthead loading optimization
    - currently the SDF is 500 kB and i wanna see how small i can get it. right now it's stored as a png but i'm thinking it might be better compressed as a binary/txt file.
