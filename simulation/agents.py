class Country:
    def __init__(self, name, lat, lon, population, gdp):
        self.name = name
        self.lat = lat
        self.lon = lon
        self.population = population
        self.gdp = gdp

    def to_dict(self):
        return {
            'name': self.name,
            'lat': self.lat,
            'lon': self.lon,
            'population': self.population,
            'gdp': self.gdp
        }
# Список стран-контрагентов
agents = [
    Country("France", 46.6, 2.2, 67_000_000,3_000_000_000_000),
    Country("Germany", 51.2, 10.4, 83_000_000,4_200_000_000_000),
    Country("Italy", 41.9, 12.5, 59_000_000,2_100_000_000_000),
]