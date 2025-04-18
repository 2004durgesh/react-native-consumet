import { VideoExtractor, type IVideo } from '../models';

class Kwik extends VideoExtractor {
  protected override serverName = 'kwik';
  protected override sources: IVideo[] = [];

  private readonly host = 'https://animepahe.ru/';

  override extract = async (videoUrl: URL): Promise<IVideo[]> => {
    try {
      const response = await fetch(`${videoUrl.href}`, {
        headers: { Referer: this.host },
      });

      const data = await response.text();

      const source = eval(/(eval)(\(f.*?)(\n<\/script>)/s.exec(data)![2]!.replace('eval', '')).match(/https.*?m3u8/);
      this.sources.push({
        url: source[0],
        isM3U8: source[0].includes('.m3u8'),
      });

      return this.sources;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
}
export default Kwik;
