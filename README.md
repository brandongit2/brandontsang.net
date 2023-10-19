this is the repository for my AWESOME website at https://www.brandontsang.net.

everything is still a work in progress, although at this point close to 95% of the site is done.

*update: there are fundamental changes i want to make to the site in the future; i'm leaving everything as-is for now!*

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
- [x] video encoding (av1, hevc, vp9)
- [x] SEO
- [ ] other polish!!!
  - [x] bundle size reduction (apparently three.js' bundle size is non-negotiable due to its architecture?? who knows but i have bigger fish to fry)
  - [x] fix layout shift
  - [ ] name masthead loading optimization
    - currently the SDF is 500 kB and i wanna see how small i can get it. right now it's stored as a png but i'm thinking it might be better compressed as a binary/txt file.
