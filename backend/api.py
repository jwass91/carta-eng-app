from flask import Flask, jsonify, request, abort
import json, random

app = Flask(__name__)

seasons = []
episodes = []
detailed_episodes = []

# import and initialize season data
with open('../data/himym-seasons.json', 'r') as f:
    seasons_raw = json.load(f)
    for season in seasons_raw:
    	seasons.append({
    		'number': season['number'],
    		'numEpisodes': season['episodeOrder'],
			'premiereDate': season['premiereDate'],
			'endDate': season['endDate'],
    	})
    	episodes.append([]) # initialize empty array for each season
    	detailed_episodes.append([]) # initialize empty array for each season

# import and initialize episode data
with open('../data/himym-episodes.json', 'r') as f:
    episodes_raw = json.load(f)
    for episode in episodes_raw['_embedded']['episodes']:
    	episodes[episode['season'] - 1].append({
    		'name': episode['name'],
    		'season': episode['season'],
    		'number': episode['number'],
    		'image': episode['image']['original'] if episode['image'] else None
    	})
    	detailed_episodes[episode['season'] - 1].append({
    		'name': episode['name'],
    		'season': episode['season'],
    		'number': episode['number'],
    		'airdate': episode['airdate'],
    		'summary': episode['summary'],
    		'image': episode['image']['original'] if episode['image'] else None
    	})

@app.route('/seasons/', methods=['GET'])
def get_seasons():
    return jsonify(seasons)

@app.route('/episodes/<int:season_num>/', methods=['GET'])
def get_seasons_episodes(season_num):
	if len(episodes) < season_num:
		abort(404)
	return jsonify(episodes[season_num - 1])

@app.route('/episodes/<int:season_num>/<int:epsiode_num>', methods=['GET'])
def get_episode(season_num, epsiode_num):
	if len(detailed_episodes) < season_num:
		abort(404)
	if len(detailed_episodes[season_num - 1]) < epsiode_num:
		abort(404)
	return jsonify(detailed_episodes[season_num - 1][epsiode_num - 1])

@app.route('/random_episode', methods=['GET'])
def get_random_episode():
	# this method favors episodes in seasosn with fewer episdoes but
	# was chosen intentionally for simplicity
	return jsonify(random.choice(random.choice(episodes)))