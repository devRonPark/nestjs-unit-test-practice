import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      // Arrange
      service.tweets = [];
      const payload = 'This is my tweet';

      // Act
      const tweet = service.createTweet(payload);

      // Assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweet created which are over 100 characters', () => {
      // Arrange
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

      // Act
      const tweet = () => service.createTweet(payload);

      // Assertion
      expect(tweet).toThrowError();
    });
  });

  describe('updateTweet', () => {
    it('should update and return tweet', () => {
      // Arrange
      service.tweets = ['첫 번째 트윗'];
      const payload = '첫 번째 트윗 업데이트함';

      // Act
      const tweet = service.updateTweet(payload, 0);

      // Assert
      expect(tweet).toBe(payload);
    });

    it('show throw an error for tweet that exceed 100 characters.', () => {
      // Arrange
      service.tweets = ['첫 번째 트윗'];
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

      // Act
      const tweet = () => service.updateTweet(payload, 0);

      // Assert
      expect(tweet).toThrowError();
    });

    it('show throw an error if the tweet to update does not exist', () => {
      // Arrange
      service.tweets = ['첫 번째 트윗'];
      const payload = '첫 번째 트윗 업데이트함';

      // Act
      const tweet = () => service.updateTweet(payload, 1);

      // Assert
      expect(tweet).toThrowError();
    });
  });

  describe('deleteTweet', () => {
    it('should delete and return tweet', () => {
      // Arrange
      service.tweets = ['첫 번째 트윗'];

      // Act
      const tweet = service.deleteTweet(0);

      // Assert
      expect(tweet).toBe('첫 번째 트윗');
      expect(service.tweets[0]).toBe(undefined);
      expect(service.tweets).toHaveLength(0);
    });

    it('show throw an error if the tweet does not exist', () => {
      // Arrange
      service.tweets = ['첫 번째 트윗'];

      // Act
      const tweet = () => service.deleteTweet(1);

      // Assert
      expect(tweet).toThrowError();
    });
  });

  describe('getTweets', () => {
    it('should return back all tweets', () => {
      // Arrange
      service.tweets = [
        '첫 번째 트윗',
        '두 번째 트윗',
        '세 번째 트윗',
        '네 번째 트윗',
      ];

      // Act
      const tweets = service.getTweets();

      // Assert
      tweets.forEach((tweet) => expect(typeof tweet).toBe('string'));
      expect(tweets).toHaveLength(4);
    });
  });
});
