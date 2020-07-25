from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()


class Sentiment:
    def __init__(self, string):
        self.string = string
        self.results = self.calc_sentiment()
        self.comp = self.results['compound']
        self.pos = self.results['pos']
        self.neu = self.results['neu']
        self.neg = self.results['neg']

    def calc_sentiment(self):
        return analyzer.polarity_scores(self.string)
