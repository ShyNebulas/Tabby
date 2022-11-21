from flask import Flask, render_template
from yaml import load as yamlLoad
from yaml.loader import SafeLoader
from json import load as jsonLoad
from json import dump
from datetime import datetime
from geopy.geocoders import Nominatim
from random import randint
#-------------------------------------------------------------------------------------------------------#
def prepare_dates():
  for semester in yaml['dates']:
    for block in yaml['dates'][semester]:
      start_date = datetime.strptime(yaml['dates'][semester][block][0]['start_date'], '%d/%m/%Y').date()
      end_date = datetime.strptime(yaml['dates'][semester][block][1]['end_date'], '%d/%m/%Y').date()
      # Find block
      if current_date >= start_date and current_date <= end_date:
        # Get week number 
        week_number = current_date.isocalendar()[1] - start_date.isocalendar()[1] + 1
        return f'{block} (Week {week_number})'  

def prepare_addresses():
  addresses = {}
  for day in classes:
    for module in classes[day]:
      address = classes[day][module]['address']
      if not address in coordinates:
        coords = {}
        coords[address] = {}
        if classes[day][module]['coordinates']:
          coords[address]['latitude'] = classes[day][module]['coordinates']['longitude']
          coords[address]['longitude'] = classes[day][module]['coordinates']['latitude']
        else:
          location = geolocator.geocode(classes[day][module]['address'])
          coords[address]['latitude'] = location.latitude
          coords[address]['longitude'] = location.longitude
        coordinates.update(coords)
      addresses[f'{day}-{module}'] = {}
      addresses[f'{day}-{module}']['latitude'] = coordinates[address]['latitude']
      addresses[f'{day}-{module}']['longitude'] = coordinates[address]['longitude']
  with open('json/coordinates.json', 'w') as file:
    dump(coordinates, file)
  return addresses

def prepare_quotes():
  return quotes[str(randint(0, len(quotes) - 1))]
#-------------------------------------------------------------------------------------------------------#
with open('config/config.yaml', 'r') as file:
  yaml = yamlLoad(file, Loader = SafeLoader)

with open('json/classes.json', 'r') as file:
  classes = jsonLoad(file)

with open('json/coordinates.json', 'r') as file:
  coordinates = jsonLoad(file)

with open('json/quotes.json', 'r') as file:
  quotes = jsonLoad(file)
#-------------------------------------------------------------------------------------------------------#
app = Flask(__name__)
current_date = datetime.now().date()
geolocator = Nominatim(user_agent = 'tabby')

@app.route('/')
def index():
  return render_template('index.html', addresses = prepare_addresses(), classes = classes, date = prepare_dates(), quote = prepare_quotes())
#-------------------------------------------------------------------------------------------------------#
if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 8082)
