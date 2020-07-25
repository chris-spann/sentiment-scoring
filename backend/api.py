from flask import Flask, request
from nlp_tools import Sentiment

app = Flask(__name__)


@app.route('/get_sentiment', methods=['GET', 'POST'])
def get_sentiment():
    req = request.get_json()
    text = req['text']
    sent = Sentiment(text)
    return {
        "text": text,
        "comp": sent.comp,
        "pos": sent.pos,
        "neu": sent.neu,
        "neg": sent.neg}
