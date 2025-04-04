import { MOVIES } from '../../src/providers';

jest.setTimeout(120000);

// run: yarn test --watch --verbose false dramacool.test.ts

const dramaCool = new MOVIES.DramaCool();

test('Search: returns a filled array of movies/TV.', async () => {
  const data = await dramaCool.search('squid game');
  expect(data.results).not.toEqual([]);
});

test('fetchMediaInfo: returns filled movie/TV info when given a mediaId.', async () => {
  const data = await dramaCool.fetchMediaInfo(
    'drama-detail/squid-games-2021-czf'
  );
  expect(data).not.toEqual({});
});

test('fetchEpisodeServers: returns filled object of streaming sources when given an episodeId.', async () => {
  const data = await dramaCool.fetchEpisodeServers(
    'video-watch/squid-games-2021-episode-9-as-jao'
  );
  expect(data).not.toEqual({});
});

test('fetchEpisodeSources: returns filled object of streaming sources when given an episodeId.', async () => {
  const data = await dramaCool.fetchEpisodeSources(
    'video-watch/squid-games-2021-episode-9-as-jao'
  );
  expect(data).not.toEqual({});
});

test('fetchMediaInfo: returns genres list when given a mediaId.', async () => {
  const data = await dramaCool.fetchMediaInfo(
    'drama-detail/squid-games-2021-czf'
  );
  expect(data.genres?.length).not.toEqual([]);
});

test('fetchMediaInfo: returns status when given a mediaId.', async () => {
  const data = await dramaCool.fetchMediaInfo(
    'drama-detail/squid-games-2021-czf'
  );
  expect(data.status).not.toEqual(undefined);
});

test('fetchMediaInfo: returns duration (if available) when given a mediaId.', async () => {
  const data = await dramaCool.fetchMediaInfo(
    'drama-detail/kimi-ga-kokoro-wo-kuretakara'
  );
  expect(data.duration).not.toEqual(undefined);
});

test('Search: returns totalPages when search: Love.', async () => {
  const data = await dramaCool.search('Love');
  expect(data.totalPages).not.toEqual(1);
});

test('fetchPopular: returns a filled array of popular movies/TV.', async () => {
  const data = await dramaCool.fetchPopular();
  expect(data.results).not.toEqual([]);
});

test('fetchRecentMovies: returns a filled array of recent movies.', async () => {
  const data = await dramaCool.fetchRecentMovies();
  expect(data.results).not.toEqual([]);
});

test('fetchRecentTvShows: returns a filled array of recent tv-shows.', async () => {
  const data = await dramaCool.fetchRecentTvShows();
  expect(data.results).not.toEqual([]);
});

test('fetchMediaInfo:returns content-rating, airs-on, director, original-network,trailer, characters', async () => {
  const data = await dramaCool.fetchMediaInfo(
    'drama-detail/squid-games-2021-czf'
  );
  expect(data.contentRating).not.toEqual(undefined);
  expect(data.airsOn).not.toEqual(undefined);
  expect(data.director).not.toEqual(undefined);
  expect(data.originalNetwork).not.toEqual(undefined);
  expect(data.trailer).not.toEqual(undefined);
  expect(data.characters).not.toEqual([]);
});

test('fetchSpotlight: returns a filled array of spotlight movies/TV.', async () => {
  const data = await dramaCool.fetchSpotlight();
  expect(data.results).not.toEqual([]);
});
